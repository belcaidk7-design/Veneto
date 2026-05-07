import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type SeoEntityType = 'page' | 'blog' | 'product' | 'faq' | 'author';

export interface SeoOverride {
  id: string;
  entity_type: SeoEntityType;
  entity_key: string;
  lang: string;
  data: Record<string, unknown>;
  updated_at: string;
}

/** Fetch a single SEO override row (entity + key + lang). */
export const useSeoOverride = (
  entityType: SeoEntityType,
  entityKey: string,
  lang: string,
) =>
  useQuery({
    queryKey: ['seo_content', entityType, entityKey, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_content')
        .select('*')
        .eq('entity_type', entityType)
        .eq('entity_key', entityKey)
        .eq('lang', lang)
        .maybeSingle();
      if (error) throw error;
      return data as SeoOverride | null;
    },
    staleTime: 60_000,
  });

/** Fetch all overrides for an entity across languages. */
export const useSeoOverridesByEntity = (
  entityType: SeoEntityType,
  entityKey: string,
) =>
  useQuery({
    queryKey: ['seo_content', entityType, entityKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_content')
        .select('*')
        .eq('entity_type', entityType)
        .eq('entity_key', entityKey);
      if (error) throw error;
      return (data ?? []) as SeoOverride[];
    },
    staleTime: 60_000,
  });

/** Fetch all overrides of a given type (used in admin lists). */
export const useSeoOverridesByType = (entityType: SeoEntityType) =>
  useQuery({
    queryKey: ['seo_content', entityType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_content')
        .select('*')
        .eq('entity_type', entityType)
        .order('entity_key');
      if (error) throw error;
      return (data ?? []) as SeoOverride[];
    },
    staleTime: 30_000,
  });
