// Contenu unique par produit — signaux E-E-A-T (expertise, expérience, autorité, fiabilité).
// Chaque entrée : story (3 paragraphes), provenance, signature, bestProjects (3), seoTitle, seoDescription.
// CONTENT: relire et personnaliser avec vos vraies références projets.

export type ProductContentEntry = {
  seoTitle: string;
  seoDescription: string;
  intro: string;
  story: string[];
  provenance: string;
  signature: string;
  bestProjects: string[];
};

const productContent: Record<string, ProductContentEntry> = {
  externalPaving: {
    seoTitle: 'Dallage extérieur en pierre naturelle | Porphyre, granit, grès',
    seoDescription: 'Dallages extérieurs en porphyre du Trentin, granit sarde et grès de Vérone. Antidérapant R11 à R13, résistants au gel. Devis rapide.',
    intro: 'Le dallage extérieur est la première chose que l\u2019on touche en arrivant chez vous. Notre rôle est de choisir la pierre qui résistera trente ans aux passages, au gel et au sel, sans rien perdre de son cachet.',
    story: [
      'nous fournissons des dallages extérieurs pour des places publiques italiennes, des cours privées en Provence et des accès de villas alpines. Chaque chantier nous a appris une chose : la durabilité d\u2019un dallage tient à 80 % au choix de la pierre et de la pose, pas à son prix.',
      'Pour les zones très exposées (entrées, plages de piscine, abords de mer), nous orientons vers le porphyre du Trentin, naturellement antidérapant et insensible aux cycles gel/dégel. Pour les espaces piétons à fort caractère architectural, le granit sarde flammé offre une régularité parfaite. Pour les ambiances chaleureuses méditerranéennes, le grès de Vérone vieilli reste imbattable.',
      'Nous calepinons systématiquement avant production : opus incertum, opus romain, dalles calibrées ou pavés. Vous recevez un plan de pose, une nuanciée de teintes par lot et une réserve de 5 % pour les coupes — la base d\u2019un chantier sans mauvaise surprise.',
    ],
    provenance: 'Réseau international de carrières partenaires sélectionnées projet par projet.',
    signature: 'Calepinage personnalisé livré avec chaque commande, plus une réserve de coupe pré-calculée.',
    bestProjects: [],
  },
  fountains: {
    seoTitle: 'Fontaines en pierre naturelle | Marbre & calcaire italien',
    seoDescription: 'Fontaines en marbre de Carrare et calcaire de Trani, sculptées à la main à Pietrasanta. Modèles catalogue ou sur dessin. Devis rapide.',
    intro: 'Une fontaine n\u2019est pas un objet, c\u2019est un point de gravité. Le bruit de l\u2019eau, la masse de la pierre, la patine qui se forme : tout doit être pensé pour traverser les générations.',
    story: [
      'Nos fontaines sont sculptées à Pietrasanta, le quartier des sculpteurs sur marbre depuis Michel-Ange. Nous travaillons avec trois ateliers familiaux qui maîtrisent aussi bien la copie de modèles classiques que la création contemporaine sur dessin.',
      'Le choix du matériau dépend de l\u2019eau et du climat. Le marbre de Carrare convient aux fontaines abritées ou intérieures de patio. Pour l\u2019extérieur exposé, nous recommandons le calcaire de Trani ou le calcaire de Vicenza, plus tolérants aux dépôts calcaires et au gel quand le drainage est correctement étudié.',
      'Nous accompagnons l\u2019hydraulique : choix de la pompe, dimensionnement du bassin, traitement de l\u2019eau, raccordement. Une fontaine mal alimentée vieillit deux fois plus vite — autant le savoir avant de couler la dalle.',
    ],
    provenance: 'Approvisionnement international, sélection bloc par bloc.',
    signature: 'Plan hydraulique fourni avec chaque fontaine sur mesure (pompe, drainage, raccordement).',
    bestProjects: [],
  },
  columns: {
    seoTitle: 'Colonnes en pierre naturelle sur mesure | Marbre, calcaire, granit',
    seoDescription: 'Colonnes en marbre, calcaire et granit, tournées CNC et finies à la main. Diamètres 20 à 60 cm, hauteurs jusqu\u2019à 4 m. Devis rapide.',
    intro: 'Une colonne porte un toit ou une intention. Dans les deux cas, ses proportions, son chapiteau et sa finition décident de tout.',
    story: [
      'Nous produisons des colonnes depuis longtemps, du fût lisse contemporain aux ordres classiques (toscan, dorique, ionique, corinthien). Le tournage est réalisé en CNC pour la précision des proportions, puis affiné à la main par nos sculpteurs pour les chapiteaux et bases.',
      'Le calcaire de Vicenza reste le meilleur compromis qualité/prix pour les colonnes ornementales : facile à sculpter, stable dans le temps, belle teinte crème. Le marbre de Carrare s\u2019impose pour les projets prestigieux où la lumière doit jouer dans la pierre. Le granit sarde, lui, sert aux colonnes structurelles soumises à fortes charges ou exposées.',
      'Pour les hauteurs supérieures à 2,5 m, nous fournissons les calculs de stabilité, les ancrages inox et les notices de levage. Une colonne n\u2019est jamais un objet isolé : entablement, socle, scellement chimique, tout doit être validé en amont.',
    ],
    provenance: 'Vicenza (calcaire), Carrare (marbre), Olbia (granit).',
    signature: 'Notice de calcul et schéma d\u2019ancrage fournis pour toute colonne ≥ 2,5 m.',
    bestProjects: [],
  },
  balustrades: {
    seoTitle: 'Balustrades en pierre naturelle | Marbre et calcaire italien',
    seoDescription: 'Balustres tournés, mains courantes et pilastres en marbre et calcaire italien. Production sur mesure, conforme NF P01-012. Devis rapide.',
    intro: 'Une balustrade est un élément de sécurité avant d\u2019être un ornement. Hauteur réglementaire, espacement des balustres, ancrage : nous traitons les deux dimensions sans compromis.',
    story: [
      'Nos balustrades respectent la norme NF P01-012 (hauteur 1 m minimum, espacement vertical entre balustres ≤ 11 cm). Nous adaptons systématiquement les modèles classiques pour qu\u2019ils soient à la fois esthétiques et conformes.',
      'Le calcaire Botticino et le calcaire de Vicenza sont nos pierres de prédilection pour les balustrades extérieures : tendres à sculpter, denses pour résister aux chocs, belle patine. Pour les intérieurs prestigieux (escaliers d\u2019hôtels, mezzanines), nous travaillons aussi en marbre Carrare.',
      'Chaque ensemble est livré numéroté, avec son plan de pose, ses goujons inox et un guide de scellement. Nos poseurs partenaires interviennent en Italie, en France et en Suisse ; ailleurs, nous coordonnons à distance.',
    ],
    provenance: 'Botticino (Brescia), Vicenza, Carrare.',
    signature: 'Conformité NF P01-012 systématique, plans de pose numérotés.',
    bestProjects: [],
  },
  flowerBoxes: {
    seoTitle: 'Jardinières en pierre naturelle | Calcaire et grès italien',
    seoDescription: 'Jardinières en calcaire de Trani et grès de Vérone, taillées dans la masse. Résistantes au gel, drainage intégré. Devis rapide.',
    intro: 'Une jardinière en pierre naturelle est un investissement à 30 ans. Choisir la bonne pierre et le bon drainage, c\u2019est s\u2019épargner les fissures du premier hiver.',
    story: [
      'Nous taillons nos jardinières dans la masse, pas en collage de plaques. Cela coûte plus cher en matière, mais c\u2019est la seule façon d\u2019éviter les infiltrations qui font éclater une jardinière au premier gel.',
      'Le calcaire de Trani convient parfaitement aux climats méditerranéens et continentaux modérés : il absorbe peu, supporte le gel, et sa teinte miel se patine doucement. Pour les zones plus humides ou de haute montagne, nous orientons vers le grès dense de Vérone, encore plus tolérant.',
      'Toutes nos jardinières sont livrées avec drainage intégré (trous calibrés et géotextile pré-posé). Nous fournissons aussi des patins en EPDM pour éviter les remontées d\u2019humidité quand elles sont posées sur dalle.',
    ],
    provenance: 'Trani (Pouilles), Vérone, Vicenza.',
    signature: 'Taille dans la masse + drainage intégré, livrées prêtes à planter.',
    bestProjects: [],
  },
  benches: {
    seoTitle: 'Bancs en pierre naturelle | Granit et calcaire italien',
    seoDescription: 'Bancs monolithes en granit sarde et calcaire de Trani, jusqu\u2019à 3 m linéaires. Pour places publiques, jardins et abords. Devis rapide.',
    intro: 'Un banc en pierre se choisit sur deux critères : la masse, qui décourage le déplacement et le vandalisme, et le confort thermique, qui détermine si on s\u2019y assied vraiment.',
    story: [
      'Nous travaillons les bancs en monolithe (taillés dans un seul bloc) jusqu\u2019à 3 m linéaires. Au-delà, nous segmentons en éléments alignés au cordeau pour préserver la lecture continue.',
      'Le granit sarde flammé est le standard mondial du mobilier urbain : indestructible, antidérapant, à peine sensible aux taches. Pour les ambiances plus chaleureuses (jardins privés, cours), le calcaire de Trani brossé offre une assise tiède au soleil et un grain doux au toucher.',
      'Les fondations comptent autant que le banc lui-même. Nous fournissons les notes de calcul de massif pour les installations urbaines, et des patins inox pour la pose sur dalle existante.',
    ],
    provenance: 'Sardaigne (granit), Trani (calcaire).',
    signature: 'Monolithes jusqu\u2019à 3 m, notes de calcul de massif fournies.',
    bestProjects: [],
  },
  bollards: {
    seoTitle: 'Bornes en pierre naturelle | Granit et porphyre',
    seoDescription: 'Bornes urbaines en granit sarde et porphyre du Trentin. Indestructibles, conformes aux normes urbaines. Devis rapide.',
    intro: 'Une borne sépare un piéton d\u2019une voiture. Dans les zones urbaines exposées, c\u2019est un objet de sécurité avant d\u2019être un ornement.',
    story: [
      'Nous produisons des bornes urbaines depuis longtemps, du modèle classique tronconique au design contemporain. Toutes sont taillées dans un bloc unique, sans creux ni assemblage, pour une résistance maximale aux chocs de véhicules.',
      'Le granit sarde reste le matériau de référence pour le mobilier urbain : densité ≥ 2 700 kg/m³, résistance à la flexion supérieure à 20 MPa, parfaitement insensible au sel de déneigement. Le porphyre du Trentin offre une alternative plus colorée pour les centres historiques italiens.',
      'Nous fournissons les ancrages inox (scellement chimique ou platine boulonnée) et adaptons les hauteurs aux usages : 60 cm pour la signalisation, 90 cm pour la séparation, 120 cm pour la protection renforcée.',
    ],
    provenance: 'Olbia (granit), Trento (porphyre).',
    signature: 'Monolithe sans collage, ancrage inox fourni, conformité aux normes urbaines.',
    bestProjects: [],
  },
  curbs: {
    seoTitle: 'Bordures en pierre naturelle | Granit et porphyre italien',
    seoDescription: 'Bordures de voirie et de jardin en granit sarde et porphyre. Longueurs jusqu\u2019à 2 m, sections sur mesure. Devis rapide.',
    intro: 'La bordure structure tout : une allée, un parterre, un trottoir. Mal choisie, elle se fissure au premier hiver. Bien choisie, elle dure cinquante ans.',
    story: [
      'Nous fournissons des bordures depuis longtemps, pour des chantiers privés comme pour des marchés publics italiens. Les sections les plus demandées (10×25, 15×30) sont en stock, les autres produites en 4 à 6 semaines.',
      'Le granit est le matériau de référence pour les bordures de voirie : il supporte le passage des véhicules, le sel de déneigement et les chocs de pelle mécanique. Le porphyre convient mieux aux espaces piétons et aux jardins, où sa palette de couleurs apporte du caractère.',
      'Nous fournissons les bordures avec abouts droits ou en biais (45°, 30°), et nous proposons des angles préfabriqués pour éviter les coupes sur chantier. Un détail qui fait gagner deux jours de pose sur un projet de 200 m linéaires.',
    ],
    provenance: 'Olbia (granit), Trento (porphyre).',
    signature: 'Angles préfabriqués sur demande, abouts en biais sans surcoût.',
    bestProjects: [],
  },
  sculptures: {
    seoTitle: 'Sculptures en pierre naturelle | Marbre de Carrare et calcaire',
    seoDescription: 'Sculptures sur mesure en marbre de Carrare et calcaire, taillées à la main à Pietrasanta. Copies, créations, restaurations. Devis rapide.',
    intro: 'Une sculpture sur mesure est un dialogue entre votre intention, le sculpteur et la pierre. Nous facilitons ce dialogue depuis longtemps.',
    story: [
      'Nous travaillons avec trois ateliers de Pietrasanta, le quartier toscan où se concentrent les meilleurs sculpteurs sur marbre depuis cinq siècles. Chacun a sa spécialité : reproduction de modèles classiques, sculpture figurative contemporaine, ou abstraction monumentale.',
      'Le projet commence toujours par un dessin ou un modèle 3D, suivi d\u2019une maquette en argile à l\u2019échelle 1:5. Vous validez avant que la pierre soit attaquée — une étape qui évite 95 % des regrets.',
      'Le marbre statuaire de Carrare reste le sommet pour la sculpture figurative : grain fin, blancheur, transparence à la lumière. Pour les pièces monumentales d\u2019extérieur, nous proposons aussi le calcaire de Vicenza, plus économique et tout aussi expressif.',
    ],
    provenance: 'Bloc de Carrare et Vicenza, sculpture à Pietrasanta.',
    signature: 'Validation par maquette en argile au 1:5 avant taille définitive.',
    bestProjects: [],
  },
  externalCladding: {
    seoTitle: 'Parement extérieur en pierre naturelle | Calcaire, grès, porphyre',
    seoDescription: 'Parements de façade en calcaire de Trani, grès de Vérone et porphyre. Pose collée ou agrafée, conforme DTU 55.2. Devis rapide.',
    intro: 'Une façade en pierre naturelle, ce n\u2019est pas qu\u2019un revêtement : c\u2019est l\u2019identité d\u2019un bâtiment pour cinquante ans. Le choix de la pierre, du format et du système de pose conditionne tout le reste.',
    story: [
      'Nous accompagnons des projets de façade depuis longtemps, du parement collé sur enduit à la pose agrafée ventilée. Sur les projets architecturaux contemporains, la pose ventilée s\u2019impose : meilleure isolation, séchage rapide, et possibilité de remplacer une plaque sans tout déposer.',
      'Le calcaire de Trani reste notre best-seller pour les façades méditerranéennes : palette miel-beige, faible absorption, vieillissement gracieux. Le grès de Vérone convient mieux aux climats continentaux humides. Le porphyre, lui, fait merveille en accents (encadrements de baies, soubassements).',
      'Nous calepinons en respectant les contraintes de pose (joints, calfeutrement, mouvements thermiques) et fournissons une nuanciée de teintes par lot. Une façade réussie est une façade homogène, et l\u2019homogénéité se vérifie au sol, pas une fois posée.',
    ],
    provenance: 'Trani, Vérone, Trento.',
    signature: 'Calepinage conforme DTU 55.2, nuanciée de teintes pré-validée par lot.',
    bestProjects: [],
  },
  interiorFlooring: {
    seoTitle: 'Sol intérieur en pierre naturelle | Marbre, calcaire, granit',
    seoDescription: 'Sols intérieurs en marbre de Carrare, calcaire de Trani et granit. Grands formats jusqu\u2019à 60×120 cm. Pose collée plein bain. Devis rapide.',
    intro: 'Un sol en pierre naturelle est ce qu\u2019on touche en premier le matin et ce qu\u2019on regarde tout le temps. Sa réussite tient à trois choses : le matériau, le calepinage et la qualité de la pose.',
    story: [
      'nous équipons des intérieurs résidentiels et hôteliers haut de gamme. Les grands formats (60×60 et surtout 60×120) sont devenus la norme : moins de joints, lecture plus continue, valorisation de la pierre.',
      'Le marbre Calacatta et le marbre Statuario restent les références pour les pièces de réception. Pour les pièces à vivre intensives, le calcaire de Trani adouci offre un excellent compromis chaleur/résistance. Le granit sarde est imbattable dans les cuisines à fort passage et les espaces commerciaux.',
      'Nous livrons toujours avec un plan de calepinage validé : sens de pose, départs, coupes. Les coupes en bordure ne doivent jamais être inférieures à la moitié d\u2019une dalle — règle simple qui change tout visuellement.',
    ],
    provenance: 'Carrare, Trani, Sardaigne.',
    signature: 'Calepinage validé avant production, jamais de coupe inférieure à la demi-dalle en bordure.',
    bestProjects: [],
  },
  interiorCladding: {
    seoTitle: 'Parement mural intérieur en pierre naturelle | Marbre & calcaire',
    seoDescription: 'Parements muraux intérieurs en marbre de Carrare et calcaire italien. Bookmatch, grandes dalles, formats sur mesure. Devis rapide.',
    intro: 'Un mur en pierre naturelle change la perception entière d\u2019une pièce. Lumière, acoustique, sensation de matière : aucun autre matériau ne produit cet effet.',
    story: [
      'Nos parements muraux intérieurs vont de la plaquette 30×60 au panneau monumental 180×280 en bookmatch. Le bookmatch — deux dalles ouvertes en miroir comme un livre — est l\u2019expression la plus spectaculaire de la pierre naturelle, idéal derrière un meuble TV ou en tête de lit.',
      'Le marbre Calacatta Viola, le Statuario et le Sahara Noir sont nos best-sellers pour les ambiances signature. Pour des projets plus sobres, le calcaire Botticino adouci ou la pierre de Trani offrent une présence plus discrète mais tout aussi noble.',
      'La pose en grandes dalles demande une préparation rigoureuse du support et une visserie de sécurité (collage seul interdit au-delà de certains formats). Nous fournissons les fiches techniques et coordonnons avec votre poseur.',
    ],
    provenance: 'Carrare, Botticino, Trani.',
    signature: 'Sélection de paires bookmatch sur place avant expédition.',
    bestProjects: [],
  },
  kitchenCountertops: {
    seoTitle: 'Plans de travail en marbre et granit | Cuisine sur mesure',
    seoDescription: 'Plans de travail cuisine en marbre Calacatta, Statuario et granit sarde. Bookmatch, mitered edge, sur mesure. Devis rapide.',
    intro: 'Un plan de travail en pierre naturelle est l\u2019élément le plus regardé d\u2019une cuisine. Il faut qu\u2019il soit beau le premier jour et qu\u2019il le reste après dix mille repas.',
    story: [
      'Nous équipons des cuisines depuis longtemps, du plan simple à l\u2019îlot de 4 mètres en bookmatch sans joint apparent. Notre force : valider chaque dalle en personne en carrière avant production, pour garantir que la veine que vous choisissez est exactement celle qui sera installée.',
      'Le marbre Calacatta reste le rêve esthétique de nos clients. Il vit, il se patine, et il se tache si on l\u2019entretient mal — nous sommes transparents sur ce point. Pour ceux qui veulent l\u2019aspect du marbre sans aucune contrainte, nous proposons des quartzites naturelles d\u2019une dureté équivalente au granit.',
      'L\u2019épaisseur visuelle se travaille en mitered edge : deux pièces de 2 cm assemblées à 45° donnent l\u2019illusion d\u2019un bloc de 4, 6 ou 8 cm. C\u2019est plus léger, moins cher et plus stable qu\u2019un vrai bloc.',
    ],
    provenance: 'Carrare (Calacatta, Statuario, Calacatta Viola), Sardaigne (granits).',
    signature: 'Validation visuelle de la dalle en carrière avant production, sans surcoût.',
    bestProjects: [],
  },
  sinks: {
    seoTitle: 'Vasques en pierre naturelle | Marbre et granit pleine masse',
    seoDescription: 'Vasques en marbre et granit sculptées dans la masse. À poser ou intégrées, dimensions sur mesure. Devis rapide.',
    intro: 'Une vasque pleine masse en pierre naturelle est un objet rare. Elle pèse, elle dure, elle se patine. Aucun composite ne reproduit cette présence.',
    story: [
      'Nous sculptons nos vasques dans un bloc unique, sans collage de fond ni de parois. Cela limite les risques de fuite à long terme et donne à l\u2019objet sa masse caractéristique.',
      'Le marbre Carrare reste notre matériau le plus demandé pour les salles de bain résidentielles. Pour un usage plus intensif (lavabos d\u2019hôtel, cuisine), le granit sarde poli ou adouci offre une résistance supérieure aux taches et aux chocs.',
      'Nous adaptons la profondeur, le diamètre et le type d\u2019évacuation à votre robinetterie. Pour les vasques à poser, nous fournissons un patin EPDM sous-jacent qui évite les marques sur le plan de toilette.',
    ],
    provenance: 'Carrare, Sardaigne.',
    signature: 'Sculpture pleine masse, percements adaptés à votre robinetterie.',
    bestProjects: [],
  },
  bathtubs: {
    seoTitle: 'Baignoires en marbre sculptées à la main | Pièces uniques',
    seoDescription: 'Baignoires monolithes en marbre de Carrare, sculptées à la main à Pietrasanta. Pièces uniques sur dessin. Devis rapide.',
    intro: 'Une baignoire en marbre est probablement la pièce la plus impressionnante qu\u2019on puisse installer dans une salle de bain. C\u2019est aussi un projet d\u2019artisanat pur : 6 à 12 semaines de sculpture, et un objet unique à la fin.',
    story: [
      'Nos baignoires sont sculptées dans un bloc unique de marbre, à Pietrasanta, par les mêmes ateliers qui taillent nos sculptures monumentales. Une baignoire standard de 180 cm part d\u2019un bloc de 3 à 4 tonnes, dont 80 % sera évacué pendant la sculpture.',
      'Le marbre statuaire de Carrare est notre matériau de référence : grain fin, transparence à la lumière, blancheur incomparable. Pour des projets signature, nous travaillons aussi en Calacatta Viola, en Sahara Noir ou en onyx rétroéclairé.',
      'Le poids final (entre 800 kg et 1,5 tonne) impose une réflexion sur la structure du sol. Nous fournissons les notes de calcul de portance et coordonnons avec votre maître d\u2019œuvre dès la phase de conception.',
    ],
    provenance: 'Bloc de Carrare, sculpture à Pietrasanta.',
    signature: 'Pièce unique, note de portance fournie, étude structurelle coordonnée.',
    bestProjects: [],
  },
  openBookSlabs: {
    seoTitle: 'Dalles open book bookmatch | Marbre et granit pour pros',
    seoDescription: 'Dalles open book bookmatch en marbre de Carrare et granit. Paires sélectionnées en carrière. Vente aux professionnels. Devis rapide.',
    intro: 'L\u2019open book est l\u2019expression la plus spectaculaire de la pierre naturelle. Deux dalles ouvertes comme un livre, deux veines en miroir, un effet quasi-architectural.',
    story: [
      'Nous fournissons des paires open book à des marbreries, agenceurs et architectes depuis longtemps. Notre travail consiste à pré-sélectionner les paires en carrière, à valider la cohérence du veinage, puis à les expédier protégées par caisses bois sur mesure.',
      'Toutes les pierres ne se prêtent pas au bookmatch. Le Calacatta, le Statuario, le Calacatta Viola et certains granits exotiques (Patagonia, Azul Macaubas) donnent les effets les plus spectaculaires. Nous documentons chaque paire avec photos haute définition avant expédition.',
      'Pour les projets exigeants, nous proposons une visite carrière pour valider les paires en personne, à Carrare ou en Sardaigne. C\u2019est l\u2019assurance de ne pas avoir de surprise au déballage.',
    ],
    provenance: 'Carrare, Sardaigne, sélections importées d\u2019Amérique du Sud.',
    signature: 'Photos HD avant expédition, visite carrière sur demande.',
    bestProjects: [],
  },
  blockSlabs: {
    seoTitle: 'Dalles de bloc en pierre naturelle | Vente aux professionnels',
    seoDescription: 'Dalles brutes en marbre, granit, calcaire et grès. Plusieurs épaisseurs, vente à la pièce ou container. Pour pros. Devis rapide.',
    intro: 'Pour les marbreries et agenceurs, accéder à une matière première fiable et tracée fait toute la différence. Nous sommes votre relais direct avec les carrières italiennes.',
    story: [
      'nous fournissons des dalles brutes à des marbreries européennes. Notre valeur ajoutée n\u2019est pas le prix — c\u2019est la sélection. Nous validons chaque lot en carrière, refusons les dalles douteuses, et garantissons la cohérence d\u2019un container à l\u2019autre.',
      'Nous travaillons toutes les épaisseurs standard (2, 3, 4, 6 et 8 cm) et toutes les finitions principales. Pour les projets architecturaux importants, nous pouvons réserver un bloc entier pour garantir l\u2019unité de teinte sur l\u2019ensemble du chantier.',
      'L\u2019expédition se fait à la pièce (palette aérienne, port à port) ou au container complet pour les marbreries qui réassortent leur stock. Documentation douanière, certification CE et fiches techniques fournies systématiquement.',
    ],
    provenance: 'Carrare, Sardaigne, Trani, Vérone.',
    signature: 'Validation en carrière + réservation de bloc entier sur demande.',
    bestProjects: [],
  },
};

export default productContent;
