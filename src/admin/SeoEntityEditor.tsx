import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSeoOverridesByEntity, type SeoEntityType } from '@/hooks/useSeoOverride';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export const LANGS = ['en', 'it', 'fr', 'de'] as const;
export type Lang = typeof LANGS[number];

export type FieldType = 'text' | 'textarea' | 'longtext' | 'url';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
}

interface SeoEntityEditorProps {
  entityType: SeoEntityType;
  entityKey: string;
  title: string;
  subtitle?: string;
  fields: FieldDef[];
}

const SeoEntityEditor = ({
  entityType,
  entityKey,
  title,
  subtitle,
  fields,
}: SeoEntityEditorProps) => {
  const qc = useQueryClient();
  const { data: overrides, isLoading } = useSeoOverridesByEntity(entityType, entityKey);
  const [active, setActive] = useState<Lang>('en');
  const [drafts, setDrafts] = useState<Record<Lang, Record<string, string>>>({
    en: {},
    it: {},
    fr: {},
    de: {},
  });

  // Hydrate drafts when data arrives
  useEffect(() => {
    if (!overrides) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const lang of LANGS) {
        const row = overrides.find((o) => o.lang === lang);
        next[lang] = (row?.data as Record<string, string>) ?? {};
      }
      return next;
    });
  }, [overrides]);

  const save = useMutation({
    mutationFn: async (lang: Lang) => {
      const payload = drafts[lang] ?? {};
      // strip empty strings so fallback to i18n still works
      const cleaned = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v != null && String(v).trim() !== ''),
      );
      const { error } = await supabase
        .from('seo_content')
        .upsert(
          {
            entity_type: entityType,
            entity_key: entityKey,
            lang,
            data: cleaned,
          },
          { onConflict: 'entity_type,entity_key,lang' },
        );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['seo_content', entityType, entityKey] });
      qc.invalidateQueries({ queryKey: ['seo_content', entityType] });
      toast.success('Saved');
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const remove = useMutation({
    mutationFn: async (lang: Lang) => {
      const { error } = await supabase
        .from('seo_content')
        .delete()
        .eq('entity_type', entityType)
        .eq('entity_key', entityKey)
        .eq('lang', lang);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['seo_content', entityType, entityKey] });
      qc.invalidateQueries({ queryKey: ['seo_content', entityType] });
      toast.success('Override cleared (fallback to default)');
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const langStatus = useMemo(() => {
    const map: Record<Lang, boolean> = { en: false, it: false, fr: false, de: false };
    overrides?.forEach((o) => {
      if (LANGS.includes(o.lang as Lang) && Object.keys(o.data ?? {}).length > 0) {
        map[o.lang as Lang] = true;
      }
    });
    return map;
  }, [overrides]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        <p className="mt-1 text-xs text-muted-foreground">
          Empty fields fall back to the default content shipped with the site.
        </p>
      </div>

      <Tabs value={active} onValueChange={(v) => setActive(v as Lang)}>
        <TabsList>
          {LANGS.map((l) => (
            <TabsTrigger key={l} value={l} className="uppercase">
              {l}
              {langStatus[l] && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />}
            </TabsTrigger>
          ))}
        </TabsList>

        {LANGS.map((lang) => (
          <TabsContent key={lang} value={lang} className="space-y-4 pt-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (
              fields.map((f) => {
                const value = drafts[lang]?.[f.key] ?? '';
                const onChange = (v: string) =>
                  setDrafts((p) => ({ ...p, [lang]: { ...p[lang], [f.key]: v } }));
                return (
                  <div key={f.key} className="space-y-1.5">
                    <Label htmlFor={`${lang}-${f.key}`}>{f.label}</Label>
                    {f.type === 'longtext' ? (
                      <Textarea
                        id={`${lang}-${f.key}`}
                        value={value}
                        rows={12}
                        placeholder={f.placeholder}
                        onChange={(e) => onChange(e.target.value)}
                        className="font-mono text-sm"
                      />
                    ) : f.type === 'textarea' ? (
                      <Textarea
                        id={`${lang}-${f.key}`}
                        value={value}
                        rows={3}
                        placeholder={f.placeholder}
                        onChange={(e) => onChange(e.target.value)}
                      />
                    ) : (
                      <Input
                        id={`${lang}-${f.key}`}
                        value={value}
                        type={f.type === 'url' ? 'url' : 'text'}
                        placeholder={f.placeholder}
                        onChange={(e) => onChange(e.target.value)}
                      />
                    )}
                    {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
                  </div>
                );
              })
            )}

            <div className="flex items-center gap-2 pt-4">
              <Button onClick={() => save.mutate(lang)} disabled={save.isPending}>
                <Save className="mr-2 h-4 w-4" />
                Save {lang.toUpperCase()}
              </Button>
              {langStatus[lang] && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm(`Clear ${lang.toUpperCase()} override?`)) remove.mutate(lang);
                  }}
                  disabled={remove.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset to default
                </Button>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SeoEntityEditor;
