import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Copy as CopyIcon,
  Clock3,
  FileText,
  Globe2,
  HeartHandshake,
  Home,
  Landmark,
  MapPin,
  ExternalLink,
  Scale,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { stateRules } from "./data/stateRules";

const initialAnswers = {
  mode: "prenup",
  state: "MA",
  locality: "",
  relationshipStage: "",
  coupleType: "",
  citizenshipStatus: "",
  citizenshipCountries: "",
  militaryStatus: "",
  governmentStatus: "",
  pensionStatus: "",
  publicBenefitsDetails: "",
  weddingMonths: "",
  discussedWithPartner: "",
  counsel: "",
  disclosureStarted: "",
  currentAssets: [],
  currentAssetValues: {},
  futureAssets: [],
  futureAssetValues: {},
  internationalAssets: "",
  foreignCountry: "",
  foreignAssetTypes: [],
  foreignResidence: "",
  foreignOwnership: "",
  futureMoveAbroad: "",
  foreignAgreementStatus: "",
  foreignLanguageDocuments: "",
  incomeGap: "",
  currentAnnualIncome: "",
  expectedAnnualIncome: "",
  expectedIncomeGrowth: "",
  debts: "",
  business: "",
  realEstate: "",
  children: "",
  careerSacrifice: "",
  pressure: ""
};

const steps = [
  { id: "path", label: "Path", icon: HeartHandshake },
  { id: "timing", label: "Timing", icon: Clock3 },
  { id: "assets", label: "Assets", icon: CircleDollarSign },
  { id: "complexity", label: "Complexity", icon: Globe2 },
  { id: "consequences", label: "Consequences", icon: AlertTriangle },
  { id: "report", label: "Report", icon: FileText }
];

const languages = {
  en: { label: "English", dir: "ltr" },
  es: { label: "Español", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
  zh: { label: "中文", dir: "ltr" }
};

const translations = {
  en: {
    brandTitle: "Should I Prenup?",
    brandSubtitle: "Readiness and issue spotting",
    boundaryNote: "Educational planning only. This tool does not draft an agreement or replace legal counsel.",
    languageLabel: "Language",
    planningValue: "planning value",
    steps: {
      path: "Path",
      timing: "Timing",
      assets: "Assets",
      complexity: "Complexity",
      consequences: "Consequences",
      report: "Report"
    },
    yes: "Yes",
    no: "No",
    unsure: "Unsure",
    back: "Back",
    next: "Next",
    prenupStep: "Prenup",
    postnupStep: "Postnup",
    pathTitle: "Marital status",
    prenupReadiness: "Prenup readiness",
    prenupReadinessText: "For someone considering marriage or already engaged.",
    postnupReadiness: "Postnup readiness",
    postnupReadinessText: "For someone already married or in a legal partnership.",
    coupleProfileTitle: "Couple profile (optional)",
    coupleTypeQuestion: "How does the couple describe the relationship?",
    coupleTypeDifferent: "Different-sex couple",
    coupleTypeSame: "Same-sex couple",
    coupleTypeAnother: "Another description",
    preferNotToSay: "Prefer not to say",
    citizenshipQuestion: "What is the couple's U.S. citizenship situation?",
    citizenshipBoth: "Both are U.S. citizens",
    citizenshipOne: "One is a U.S. citizen",
    citizenshipNeither: "Neither is a U.S. citizen",
    citizenshipCountriesQuestion: "Countries of citizenship or cross-border context (optional)",
    citizenshipCountriesPlaceholder: "Example: United States and Canada",
    militaryQuestion: "Does either partner currently serve, previously serve, or have military retirement or survivor benefits?",
    governmentQuestion: "Does either partner work for a government or hold elected or appointed public office?",
    pensionQuestion: "Does either partner have or expect a pension or other defined-benefit retirement plan?",
    publicBenefitsDetailsQuestion: "Military, government, or pension details (optional)",
    publicBenefitsDetailsPlaceholder: "Example: Army Reserve; federal employee; state teacher pension after 25 years",
    publicBenefitsTitle: "Military, public-service, and pension profile",
    militaryLabel: "Military service or benefits",
    governmentLabel: "Government employment or public office",
    pensionLabel: "Current or expected pension",
    detailsLabel: "Provided details",
    marriageLicenseState: "What state will the marriage license get filed?",
    localityQuestion: "City or ZIP code (optional — used only to build local lawyer links)",
    localityPlaceholder: "Example: Boston or 02108",
    timingPrenup: "Wedding timing and process",
    timingPostnup: "Postnup process readiness",
    weddingMonths: "How many months away is the wedding?",
    topicDiscussed: "Has the topic been discussed with the other person?",
    counsel: "Has either person spoken with an attorney?",
    disclosureStarted: "Have financial disclosures or documents been started?",
    pressure: "Is anyone feeling rushed or pressured?",
    conversationEyebrow: "Conversation starter",
    conversationTitle: "How to bring it up without making dinner weird",
    conversationIntro: "Use this as a starting point and make it sound like you. Calm, early, and mutual beats perfect wording.",
    conversationOpenPrenupFirst: "Okay, I have a wildly romantic agenda item: paperwork. I want to talk about a prenup.",
    conversationOpenPrenupFollowup: "Can we pick back up on the prenup conversation? I promise this is not my attempt to turn our relationship into a terms-and-conditions page.",
    conversationOpenPostnupFirst: "I know ‘postnup’ is not usually competing with flowers for most romantic word of the year, but I want to talk about one.",
    conversationOpenPostnupFollowup: "Can we come back to the postnup conversation? I want to make sure we discuss it thoughtfully instead of letting it become a vague, uncomfortable cloud.",
    conversationCorePrenup: "I am not bringing this up because I expect us to fail or because I am planning an escape hatch. I care about us, and I would rather make financial expectations clear while we are on the same team than leave difficult decisions to default divorce law later.",
    conversationCorePostnup: "I am not bringing this up because I think something is wrong with us. I care about our marriage, and I think putting clear financial expectations in writing could protect both of us and prevent misunderstandings later.",
    conversationAssetSpecific:
      "I especially want us to make clear rules for {topics}, because those are easier to plan for together now than reconstruct during a dispute.",
    conversationSameSex:
      "As a same-sex couple, I also want our plan to reflect our relationship accurately and, where another country is involved, account for the fact that recognition and protections are not identical everywhere.",
    conversationMixedCitizenship:
      "Because our citizenship and legal ties may connect more than one country{countries}, I want us to make sure the agreement works across borders instead of assuming one set of rules follows us everywhere.",
    conversationBothCitizensForeign:
      "Even though we are both U.S. citizens, the foreign property or legal connection still needs its own planning because citizenship does not override another country's title or family-law rules.",
    conversationFamilySpecific:
      "I also want us to be thoughtful about children, housing, support, and any career sacrifices, so the agreement protects the person making those contributions too.",
    conversationPublicBenefits:
      "We should also understand how military or government benefits and any pension may work, including vesting, survivor elections, and what can legally be divided or waived.",
    conversationFairness: "I want the process and the agreement to be fair to both of us—not a way for one person to ‘win.’ We should both be honest about finances, have time to think, and be able to get our own legal advice.",
    conversationRush: "Because the timing is tight, I do not want either of us to feel pressured. If there is not enough time to handle this properly, we should ask lawyers what a fair timeline looks like instead of forcing a rushed signature.",
    conversationAsk: "Would you be open to talking about what each of us would want protected, what would feel fair, and what questions we should bring to separate attorneys?",
    conversationTipsTitle: "Delivery notes",
    conversationTips: [
      "Choose a calm, private time—not during an argument, in front of family, or five minutes before a wedding appointment.",
      "Lead with protecting both people and creating clarity; avoid opening with ‘I need to protect my stuff.’",
      "Treat the first talk as a conversation, not a demand for an immediate answer or signature."
    ],
    copyScript: "Copy script",
    copiedScript: "Copied",
    assetsTitle: "Current and future assets",
    currentTopics: "Current financial topics",
    estimatedCurrentValues: "Estimated current values",
    futureTopics: "Future asset topics",
    estimatedFutureValues: "Estimated future values",
    currentTotal: "Current estimated total:",
    futureTotal: "Future estimated total:",
    complexityTitle: "Agreement complexity and foreign implications",
    complexityIntro:
      "These questions identify where one state's agreement may collide with another country's property, family, tax, inheritance, registration, or enforcement rules.",
    internationalQuestion: "Are any current or expected assets outside the United States?",
    foreignCountry: "Foreign country or jurisdiction connected to the asset",
    foreignAssetTypesTitle: "What is located or expected there?",
    foreignResidenceQuestion: "Where does either person live, have legal domicile, or realistically expect to live?",
    foreignResidencePlaceholder: "Example: Massachusetts now; possible move to France in 2029",
    foreignOwnershipQuestion: "How is the foreign property or account owned or titled?",
    foreignOwnershipPlaceholder: "Example: solely owned apartment; family company; joint bank account; trust beneficiary",
    futureMoveQuestion: "Could either person move to, work in, or retire in another country?",
    foreignAgreementQuestion: "Is there already a marriage contract, local marital regime election, trust instrument, or similar foreign document?",
    foreignLanguageQuestion: "Are important titles, statements, contracts, or official records in another language?",
    complexityAnalysisTitle: "What is making this agreement complicated",
    complexityAnalysisIntro: "This is a drafting and coordination score—not a prediction that the agreement will fail.",
    complexityLower: "Lower complexity",
    complexityModerate: "Moderate complexity",
    complexityHigh: "High complexity",
    foreignImplicationsTitle: "Cross-border implications to investigate",
    foreignImplicationsIntro:
      "A U.S. agreement should not be assumed to bind a foreign court, registry, pension administrator, company, trustee, or tax authority.",
    foreignProfileDetails: "Details from this couple's answers",
    incomeGap: "Is there a meaningful income or wealth gap?",
    incomeGrowthTitle: "Expected income and growth during the marriage",
    currentIncome: "Current estimated annual income",
    expectedIncome: "Expected future annual income",
    incomeGrowthContext: "Expected income growth context",
    business: "Does either person own or expect to own a business?",
    realEstate: "Is real estate involved?",
    combinedFactors: "Are debts, student loans, children, or career sacrifices part of the picture?",
    debt: "Debt",
    children: "Children",
    careerSacrifice: "Career sacrifice",
    planningReport: "Planning report",
    valueInDiscussing: "value in discussing an agreement",
    downloadPdf: "Download PDF",
    whyImportant: "Why a prenup can be important",
    whyPostnupImportant: "Why a postnup can be important",
    whyImportantItems: [
      "It replaces private assumptions with written expectations about ownership, sharing, debt, and support.",
      "It can define what stays separate, what becomes marital or community property, and how commingling or joint contributions will be treated.",
      "It can address future growth—not just today's balances—including business appreciation, investment gains, raises, bonuses, and property equity.",
      "It can allocate responsibility for existing and future debt, major expenses, taxes, and jointly acquired property.",
      "It can protect the less-wealthy partner too by addressing housing, support, career sacrifice, caregiving, or a transition period after separation.",
      "The disclosure and negotiation process can surface financial expectations early, while the couple is cooperating rather than already in conflict.",
      "Clear terms can reduce uncertainty, legal fees, and the number of issues left for a court to decide—although no agreement can eliminate every dispute."
    ],
    whyImportantStateTemplate:
      "Without an agreement, {state}'s default rules—not the couple's informal understanding—may control many financial questions.",
    whyImportantSelectedTemplate: "For this couple, the agreement could address {topics} before values, ownership, or expectations become harder to untangle.",
    whyImportantFamily:
      "Because children, caregiving, or career sacrifice may be involved, the conversation can include mutual protections rather than focusing only on asset shielding.",
    whyImportantInternational:
      "Cross-border assets or citizenship connections make governing law, recognition, title, inheritance, and enforcement worth addressing before a dispute.",
    mostAtRisk: "What may be most at risk",
    stateContext: "State context",
    foreignLawNote: "Foreign asset controlling-law note",
    foreignAgreementTreatment: "How agreements are treated",
    foreignPropertyRules: "Property and inheritance rules",
    foreignFormalities: "Local formalities that may matter",
    foreignWatchItems: "Issues to verify",
    foreignQuestions: "Questions for local counsel",
    foreignCoupleChecks: "Couple-specific cross-border checks",
    foreignSources: "Verification sources",
    foreignDisclaimer:
      "This is a jurisdiction-specific issue checklist, not a legal opinion. Local law, residence, nationality, asset location, and the forum hearing a future case can change the result.",
    incomeAndGrowth: "Expected income and growth",
    whyNeedPlanning: "Why this case may need planning",
    recommendedNextSteps: "Recommended next steps",
    estimatedCost: "Estimated attorney cost",
    stateAdjustment: "State-specific benchmark:",
    costDriverLabel: "Main cost drivers:",
    costSourceLabel: "Rate benchmark source",
    attorneyTopics: "Attorney discussion topics",
    materialsTitle: "Documents and materials to gather",
    materialsIntro: "Bring recent, complete records for both partners when possible. Your attorney may ask for a different time period or additional documents.",
    materialsCoreItems: [
      "Government ID, contact information, wedding date or marriage certificate, and any prior marriage, divorce, support, or property agreements.",
      "Recent statements for checking, savings, brokerage, cryptocurrency, and other financial accounts, including account ownership and approximate opening dates.",
      "Retirement and deferred-compensation records: 401(k), IRA, pension, stock options, restricted stock, bonuses, and employer benefit summaries.",
      "The last two or three years of tax returns, recent pay stubs, employment agreements, and documents showing other income.",
      "Current debt statements for mortgages, student loans, credit cards, personal loans, tax debt, guarantees, and other obligations.",
      "A written list of valuable personal property, expected gifts or inheritances, and anything either person believes should remain separate."
    ],
    materialsBusiness: "Business records: formation and governing documents, ownership or cap table, buy-sell agreements, recent financial statements and tax returns, valuations, and outstanding loans.",
    materialsRealEstate: "Real-estate records: deeds, purchase and closing documents, mortgage statements, appraisals, leases, and records of down payments, renovations, or other contributions.",
    materialsEstate: "Estate and family-wealth records: trust documents, wills, gift or inheritance records, beneficiary designations, and relevant family letters or restrictions.",
    materialsInternational: "Cross-border records: foreign titles, account statements, marriage or citizenship documents, tax records, existing agreements, and certified translations when needed.",
    materialsPostnup: "Postnup records: documents showing major transfers or purchases during the marriage, joint-account history, existing estate documents, and any prior written financial promises.",
    materialsMilitary: "Military records: current orders or service status, Leave and Earnings Statements, retirement-point or pension estimates, Thrift Savings Plan statements, Survivor Benefit Plan elections, and disability-benefit information.",
    materialsGovernment: "Government/public-office records: employment and benefit summaries, required ethics or financial disclosures, conflict-of-interest rules, deferred compensation, and restrictions on outside income or asset ownership.",
    materialsPension: "Pension records: plan summary, recent benefit estimate, vesting and service-credit history, contribution records, survivor options, beneficiary elections, and any prior division order.",
    materialsPrivacyNote: "Use a secure portal or another method approved by the attorney; do not email sensitive account numbers or identity documents casually.",
    attorneyMilitary: "How federal military-benefit rules, service overlap, retirement division, disability benefits, Survivor Benefit Plan coverage, and jurisdiction limits affect permissible terms.",
    attorneyGovernment: "Whether public-office or government-employment ethics rules, mandatory disclosures, conflicts, outside-income limits, or public-record concerns affect the agreement or negotiation process.",
    attorneyPension: "How pension vesting, service credits, premarital and marital accrual, valuation, survivor benefits, beneficiary elections, and any future domestic-relations order should be handled.",
    localLawyersTitle: "Find local family-law attorneys",
    localLawyersIntro: "Search links are based on the selected state and optional city or ZIP code.",
    localLawyersMap: "Search nearby prenup/postnup attorneys",
    localLawyersDirectory: "Browse the state family-law directory",
    localLawyersBar: "Find a bar-sponsored referral service",
    localLawyersDisclaimer:
      "These are search and referral links, not endorsements. Verify licensing, current standing, relevant agreement experience, fees, and conflicts. Each partner should consider separate counsel.",
    attorneyTopicItems: [
      "Which state law should govern, what execution formalities apply, and how early the agreement should be completed.",
      "Whether each partner should have separate counsel and how to document voluntary, informed negotiation without pressure.",
      "What financial disclosure is required, how values will be confirmed, and whether schedules of assets and debts should be attached.",
      "Which current assets and debts are separate, marital, or community property—and how tracing, refinancing, retitling, or commingling could change that.",
      "How future earnings, bonuses, equity compensation, business appreciation, investment gains, retirement contributions, and real-estate equity will be treated.",
      "Whether and how to address spousal support, housing, caregiving, disability, education, or compensation for career sacrifice.",
      "How business control, valuation, buyouts, distributions, professional practices, and family-business restrictions should be handled.",
      "How the agreement should coordinate with wills, trusts, life insurance, beneficiary designations, and rights at death.",
      "Whether to include review dates, sunset provisions, amendment rules, mediation, fee provisions, or other dispute-resolution terms.",
      "Whether tax, immigration, foreign-property, or cross-border enforcement issues require another specialist or local counsel."
    ],
    assetSnapshot: "Asset value snapshot",
    assetEstimateNote: "These are planning estimates only and should be replaced with formal disclosure numbers before signing.",
    lossExposureTitle: "What could be on the line without an agreement",
    lossExposureIntro:
      "Without a prenup or postnup, state default rules—not the couple's own written plan—may control how property, growth, debt, and support disputes are handled.",
    lossExposureValueLabel: "Entered value connected to flagged topics",
    lossExposureValueNote: "This is the value connected to the selected topics, not an estimate of what anyone would lose.",
    lossExposureDisclaimer:
      "Possible exposure does not mean automatic loss. The actual result depends on ownership, timing, tracing, state law, enforceability, and the facts at divorce.",
    sourceNotes: "Source notes",
    consequencesTitle: "Consequences simulator",
    storyEyebrow: "Slightly dramatic scenario",
    storyTitle: "If no agreement exists",
    statisticsTitle: "Divorce statistics and unofficial context",
    statisticsDisclaimer:
      "This combines an official population statistic with a transparent, unofficial planning indicator. The indicator is not this couple's personal divorce probability.",
    baselineRate:
      "The CDC rate is a population-level annual crude rate—not the percentage of marriages ending in divorce and not this couple's probability.",
    complexityImpact:
      "Positive points flag more unresolved planning friction; negative points reflect preparation already underway. The math is editorial and deliberately visible, not a validated model.",
    nationalBenchmark: "U.S. reported-jurisdiction benchmark",
    stateComparison: "Compared with the national benchmark",
    stateDataUnavailable: "No comparable 2023 CDC state rate is available",
    unofficialIndexTitle: "Unofficial divorce-context indicator",
    unofficialIndexExplanation:
      "Starts at 50 and moves only by the listed signals. It is a 0–100 planning scale, not a percentage or forecast.",
    signalBreakdown: "Signals used in the indicator",
    noIndicatorSignals: "No profile or preparation signals have been entered yet.",
    notScoredTitle: "Characteristics deliberately not scored",
    notScoredIntro:
      "These answers still shape legal and financial planning, but the app does not turn them into divorce odds without directly comparable evidence.",
    divorceSourceLabel: "CDC/NCHS 2023 state divorce statistics",
    contextBandLower: "Lower-context signal",
    contextBandMixed: "Mixed-context signal",
    contextBandElevated: "Elevated-context signal",
    litigationCostEyebrow: "The expensive version of figuring it out later",
    litigationCostTitle: "Rough combined divorce-litigation cost",
    litigationCostIntro:
      "This estimates what both sides together might spend litigating financial issues, using the selected state's lawyer-rate benchmark and the asset complexity entered here.",
    litigationAttorneyFees: "Estimated combined attorney fees",
    litigationExpertFees: "Possible valuation and expert costs",
    litigationHours: "Combined attorney-time assumption",
    litigationAssetBasis: "Entered asset-value basis",
    litigationFactors: "Inputs increasing the estimate",
    litigationNoFactors: "No asset-specific complexity factor selected yet",
    litigationRateSource: "State lawyer-rate benchmark source",
    litigationDisclaimer:
      "Planning estimate only—not a quote or prediction. It assumes a genuinely contested financial case and does not include the property divided between spouses, child-custody litigation, support awards, taxes, appeals, or the cost of challenging an agreement. A prenup or postnup may narrow disputes but cannot guarantee that litigation will be avoided.",
    consequenceExposureTitle: "Where money, property, or control could get tied up",
    consequenceExposureIntro:
      "These are the entered topics most likely to require tracing, valuation, negotiation, a buyout, or a court decision if the couple has no controlling agreement.",
    consequenceExposureValue: "Entered value connected to these issues",
    consequenceTimelineTitle: "How a contested financial divorce can unfold",
    consequenceTimelineIntro:
      "Illustrative stages only. They can overlap, settle early, or last much longer depending on the court, cooperation, discovery, experts, and appeals.",
    agreementBoundaryTitle: "What an agreement may help with—and where it stops",
    agreementMayHelp: "May reduce uncertainty about",
    agreementCannotControl: "Cannot conclusively control",
    agreementMayHelpItems: [
      "Which assets and debts are separate, shared, marital, or community property.",
      "How appreciation, investment income, future earnings, real-estate equity, and business growth will be treated.",
      "Responsibility for debts, valuation methods, sale or buyout procedures, and some fee or dispute-resolution rules.",
      "Spousal-support expectations where state law permits, subject to enforceability review.",
      "Disclosure expectations and a written record of what both people understood when they signed."
    ],
    agreementCannotControlItems: [
      "A child's custody, parenting schedule, or final child-support rights; courts decide those under current law and the child's interests.",
      "Undisclosed or hidden assets, fraudulent transfers, illegal terms, or rights that cannot lawfully be waived.",
      "Whether a court will enforce every provision after reviewing voluntariness, disclosure, counsel, timing, fairness, and public policy.",
      "Future facts nobody addressed, every tax consequence, or every foreign court and asset registry.",
      "All legal fees or conflict. A clear agreement can narrow issues; it is not a force field."
    ],
    selectedStressors: "Selected stressors",
    noStressors: "No major stressors selected yet.",
    estimatedDisputeExposure: "Estimated dispute exposure",
    stateBenchmark: "State benchmark",
    rateNote: "provisional annual divorces per 1,000 residents (2023)",
    exposureLower: "Lower",
    exposureModerate: "Moderate",
    exposureHigh: "High",
    storyRefreshNote: "The story updates as the answers change."
  },
  es: {
    brandTitle: "¿Necesito un acuerdo prenupcial?",
    brandSubtitle: "Preparación e identificación de temas",
    boundaryNote: "Solo planificación educativa. Esta herramienta no redacta un acuerdo ni reemplaza a un abogado.",
    languageLabel: "Idioma",
    planningValue: "valor de planificación",
    steps: { path: "Ruta", timing: "Tiempo", assets: "Activos", complexity: "Complejidad", consequences: "Consecuencias", report: "Reporte" },
    yes: "Sí",
    no: "No",
    unsure: "No estoy seguro",
    back: "Atrás",
    next: "Siguiente",
    prenupStep: "Prenupcial",
    postnupStep: "Postnupcial",
    pathTitle: "Estado civil",
    prenupReadiness: "Preparación prenupcial",
    prenupReadinessText: "Para alguien que está considerando casarse o ya está comprometido.",
    postnupReadiness: "Preparación postnupcial",
    postnupReadinessText: "Para alguien que ya está casado o en una unión legal.",
    coupleProfileTitle: "Perfil de la pareja (opcional)",
    coupleTypeQuestion: "¿Cómo describe la pareja su relación?",
    coupleTypeDifferent: "Pareja de distinto sexo",
    coupleTypeSame: "Pareja del mismo sexo",
    coupleTypeAnother: "Otra descripción",
    preferNotToSay: "Prefiero no decirlo",
    citizenshipQuestion: "¿Cuál es la situación de ciudadanía estadounidense de la pareja?",
    citizenshipBoth: "Ambos son ciudadanos de EE. UU.",
    citizenshipOne: "Uno es ciudadano de EE. UU.",
    citizenshipNeither: "Ninguno es ciudadano de EE. UU.",
    citizenshipCountriesQuestion: "Países de ciudadanía o contexto internacional (opcional)",
    citizenshipCountriesPlaceholder: "Ejemplo: Estados Unidos y Canadá",
    militaryQuestion: "¿Alguna persona sirve o sirvió en las fuerzas armadas, o tiene beneficios militares de jubilación o sobreviviente?",
    governmentQuestion: "¿Alguna persona trabaja para el gobierno u ocupa un cargo público electo o designado?",
    pensionQuestion: "¿Alguna persona tiene o espera una pensión u otro plan de jubilación de beneficio definido?",
    publicBenefitsDetailsQuestion: "Detalles militares, gubernamentales o de pensión (opcional)",
    publicBenefitsDetailsPlaceholder: "Ejemplo: Reserva del Ejército; empleo federal; pensión docente estatal tras 25 años",
    publicBenefitsTitle: "Perfil militar, de servicio público y pensión",
    militaryLabel: "Servicio o beneficios militares",
    governmentLabel: "Empleo gubernamental o cargo público",
    pensionLabel: "Pensión actual o esperada",
    detailsLabel: "Detalles proporcionados",
    marriageLicenseState: "¿En qué estado se presentará la licencia de matrimonio?",
    localityQuestion: "Ciudad o código postal (opcional; solo se usa para crear enlaces a abogados locales)",
    localityPlaceholder: "Ejemplo: Boston o 02108",
    timingPrenup: "Tiempo de la boda y proceso",
    timingPostnup: "Preparación del proceso postnupcial",
    weddingMonths: "¿Cuántos meses faltan para la boda?",
    topicDiscussed: "¿Se ha hablado del tema con la otra persona?",
    counsel: "¿Alguna de las personas ha hablado con un abogado?",
    disclosureStarted: "¿Ya comenzaron las declaraciones o documentos financieros?",
    pressure: "¿Alguien se siente apurado o presionado?",
    conversationEyebrow: "Inicio de conversación",
    conversationTitle: "Cómo plantearlo sin volver incómoda la cena",
    conversationIntro: "Úsalo como punto de partida y adáptalo a tu forma de hablar. Es mejor hablar con calma, temprano y como equipo que buscar palabras perfectas.",
    conversationOpenPrenupFirst: "Bueno, tengo un tema tremendamente romántico para la agenda: papeleo. Quiero hablar sobre un acuerdo prenupcial.",
    conversationOpenPrenupFollowup: "¿Podemos retomar la conversación sobre el acuerdo prenupcial? Prometo que no intento convertir nuestra relación en una página de términos y condiciones.",
    conversationOpenPostnupFirst: "Sé que ‘acuerdo postnupcial’ no compite con las flores por la palabra más romántica del año, pero quiero hablar sobre uno.",
    conversationOpenPostnupFollowup: "¿Podemos retomar la conversación sobre el acuerdo postnupcial? Quiero que lo hablemos con cuidado en vez de dejar que se convierta en una nube incómoda.",
    conversationCorePrenup: "No lo planteo porque espere que fracasemos ni porque esté planeando una salida. Me importa nuestra relación y prefiero aclarar las expectativas financieras mientras estamos en el mismo equipo, en vez de dejar decisiones difíciles a la ley de divorcio predeterminada.",
    conversationCorePostnup: "No lo planteo porque crea que algo va mal entre nosotros. Me importa nuestro matrimonio y creo que poner expectativas financieras claras por escrito puede protegernos a ambos y evitar malentendidos.",
    conversationAssetSpecific:
      "Quiero que establezcamos reglas claras especialmente para {topics}, porque es más fácil planificarlo juntos ahora que reconstruirlo durante una disputa.",
    conversationSameSex:
      "Como pareja del mismo sexo, también quiero que nuestro plan refleje bien nuestra relación y, si interviene otro país, tenga en cuenta que el reconocimiento y las protecciones no son iguales en todas partes.",
    conversationMixedCitizenship:
      "Como nuestra ciudadanía y vínculos legales pueden conectar a más de un país{countries}, quiero asegurarme de que el acuerdo funcione internacionalmente en vez de suponer que las mismas reglas nos siguen a todas partes.",
    conversationBothCitizensForeign:
      "Aunque ambos seamos ciudadanos estadounidenses, la propiedad o conexión extranjera necesita su propia planificación porque la ciudadanía no reemplaza las reglas de propiedad o familia de otro país.",
    conversationFamilySpecific:
      "También quiero que pensemos bien en los hijos, la vivienda, la manutención y cualquier sacrificio profesional, para que el acuerdo proteja también a quien haga esas contribuciones.",
    conversationPublicBenefits:
      "También deberíamos entender cómo funcionan los beneficios militares o gubernamentales y cualquier pensión, incluida la adquisición, las elecciones de sobreviviente y lo que legalmente puede dividirse o renunciarse.",
    conversationFairness: "Quiero que el proceso y el acuerdo sean justos para ambos, no una manera de que una persona ‘gane’. Los dos debemos ser honestos sobre las finanzas, tener tiempo para pensar y poder recibir asesoría legal independiente.",
    conversationRush: "Como el tiempo es ajustado, no quiero que ninguno se sienta presionado. Si no hay tiempo suficiente para hacerlo bien, debemos preguntar a abogados cuál sería un plazo justo en vez de forzar una firma apresurada.",
    conversationAsk: "¿Estarías dispuesto/a a hablar sobre qué querría proteger cada uno, qué nos parecería justo y qué preguntas deberíamos llevar a abogados separados?",
    conversationTipsTitle: "Consejos para decirlo",
    conversationTips: [
      "Elige un momento tranquilo y privado, no durante una discusión, frente a la familia ni cinco minutos antes de una cita de boda.",
      "Empieza hablando de proteger a ambos y crear claridad; evita abrir con ‘necesito proteger mis cosas’.",
      "Trata la primera charla como una conversación, no como una exigencia de respuesta o firma inmediata."
    ],
    copyScript: "Copiar guion",
    copiedScript: "Copiado",
    assetsTitle: "Activos actuales y futuros",
    currentTopics: "Temas financieros actuales",
    estimatedCurrentValues: "Valores actuales estimados",
    futureTopics: "Temas de activos futuros",
    estimatedFutureValues: "Valores futuros estimados",
    currentTotal: "Total actual estimado:",
    futureTotal: "Total futuro estimado:",
    complexityTitle: "Factores de complejidad",
    internationalQuestion: "¿Hay activos actuales o esperados fuera de Estados Unidos?",
    foreignCountry: "País o jurisdicción extranjera vinculada al activo",
    incomeGap: "¿Existe una diferencia significativa de ingresos o patrimonio?",
    incomeGrowthTitle: "Ingresos esperados y crecimiento durante el matrimonio",
    currentIncome: "Ingreso anual actual estimado",
    expectedIncome: "Ingreso anual futuro esperado",
    incomeGrowthContext: "Contexto del crecimiento de ingresos",
    business: "¿Alguna persona tiene o espera tener un negocio?",
    realEstate: "¿Hay bienes raíces involucrados?",
    combinedFactors: "¿Hay deudas, préstamos estudiantiles, hijos o sacrificios profesionales?",
    debt: "Deuda",
    children: "Hijos",
    careerSacrifice: "Sacrificio profesional",
    planningReport: "Reporte de planificación",
    valueInDiscussing: "valor al discutir un acuerdo",
    downloadPdf: "Descargar PDF",
    whyImportant: "Por qué un acuerdo prenupcial puede ser importante",
    whyPostnupImportant: "Por qué un acuerdo postnupcial puede ser importante",
    whyImportantItems: [
      "Sustituye suposiciones privadas por expectativas escritas sobre propiedad, reparto, deudas y apoyo.",
      "Puede definir qué permanece separado, qué se vuelve bien matrimonial o comunitario y cómo se tratarán la mezcla de fondos y las contribuciones conjuntas.",
      "Puede abordar el crecimiento futuro, no solo los saldos actuales: aumento de valor de negocios, inversiones, salarios, bonos y plusvalía inmobiliaria.",
      "Puede asignar responsabilidad por deudas actuales y futuras, gastos importantes, impuestos y bienes adquiridos conjuntamente.",
      "También puede proteger a la persona con menos patrimonio mediante vivienda, apoyo, sacrificio profesional, cuidados o un período de transición tras la separación.",
      "La divulgación y negociación pueden revelar expectativas financieras mientras la pareja coopera, antes de que exista un conflicto.",
      "Términos claros pueden reducir incertidumbre, honorarios y asuntos que decidiría un tribunal, aunque ningún acuerdo elimina toda disputa."
    ],
    whyImportantStateTemplate:
      "Sin un acuerdo, las reglas predeterminadas de {state}, no el entendimiento informal de la pareja, pueden controlar muchas cuestiones financieras.",
    whyImportantSelectedTemplate:
      "Para esta pareja, el acuerdo podría abordar {topics} antes de que los valores, la propiedad o las expectativas sean más difíciles de separar.",
    whyImportantFamily:
      "Si hay hijos, cuidados o sacrificio profesional, la conversación puede incluir protecciones mutuas y no solo protección de activos.",
    whyImportantInternational:
      "Los activos o conexiones internacionales hacen importante aclarar ley aplicable, reconocimiento, título, herencia y ejecución antes de una disputa.",
    mostAtRisk: "Lo que puede estar en mayor riesgo",
    stateContext: "Contexto estatal",
    foreignLawNote: "Nota sobre ley aplicable a activos extranjeros",
    foreignAgreementTreatment: "Cómo se tratan los acuerdos",
    foreignPropertyRules: "Reglas de bienes y herencia",
    foreignFormalities: "Formalidades locales relevantes",
    foreignWatchItems: "Cuestiones para verificar",
    foreignQuestions: "Preguntas para el abogado local",
    foreignCoupleChecks: "Verificaciones internacionales específicas de la pareja",
    foreignSources: "Fuentes de verificación",
    foreignDisclaimer:
      "Esta es una lista de cuestiones específicas de la jurisdicción, no una opinión legal. La residencia, nacionalidad, ubicación del activo y el tribunal que conozca un caso futuro pueden cambiar el resultado.",
    incomeAndGrowth: "Ingresos esperados y crecimiento",
    whyNeedPlanning: "Por qué este caso puede necesitar planificación",
    recommendedNextSteps: "Próximos pasos recomendados",
    estimatedCost: "Costo estimado de abogado",
    stateAdjustment: "Referencia específica del estado:",
    costDriverLabel: "Factores principales de costo:",
    costSourceLabel: "Fuente de la referencia de tarifas",
    attorneyTopics: "Temas para hablar con el abogado",
    materialsTitle: "Documentos y materiales que conviene reunir",
    materialsIntro: "Cuando sea posible, lleven registros recientes y completos de ambas personas. El abogado puede pedir otro período o documentos adicionales.",
    materialsCoreItems: [
      "Identificación oficial, datos de contacto, fecha de boda o certificado de matrimonio y acuerdos anteriores de matrimonio, divorcio, manutención o bienes.",
      "Estados recientes de cuentas bancarias, inversión, criptomonedas y otras cuentas, con titularidad y fecha aproximada de apertura.",
      "Documentos de jubilación y compensación diferida: 401(k), IRA, pensión, opciones, acciones restringidas, bonos y beneficios laborales.",
      "Declaraciones de impuestos de los últimos dos o tres años, recibos de sueldo, contratos laborales y prueba de otros ingresos.",
      "Estados actuales de hipotecas, préstamos estudiantiles, tarjetas, préstamos personales, deuda fiscal, garantías y otras obligaciones.",
      "Lista escrita de bienes personales valiosos, regalos o herencias esperadas y aquello que cada persona considera separado."
    ],
    materialsBusiness: "Documentos de negocio: constitución y gobierno, propiedad o tabla de capitalización, acuerdos de compraventa, estados financieros e impuestos recientes, valoraciones y préstamos.",
    materialsRealEstate: "Documentos inmobiliarios: escrituras, compra y cierre, hipotecas, tasaciones, arrendamientos y pruebas de anticipos, reformas u otras contribuciones.",
    materialsEstate: "Documentos patrimoniales: fideicomisos, testamentos, regalos o herencias, beneficiarios y cartas o restricciones familiares relevantes.",
    materialsInternational: "Documentos internacionales: títulos extranjeros, estados de cuenta, documentos de matrimonio o ciudadanía, impuestos, acuerdos existentes y traducciones certificadas cuando hagan falta.",
    materialsPostnup: "Para un postnup: documentos de transferencias o compras importantes durante el matrimonio, historial de cuentas conjuntas, documentos sucesorios y promesas financieras escritas.",
    materialsMilitary: "Registros militares: órdenes o situación de servicio, comprobantes de pago, estimaciones de retiro, estados del Thrift Savings Plan, elecciones de Survivor Benefit Plan e información de discapacidad.",
    materialsGovernment: "Registros gubernamentales o de cargo público: empleo y beneficios, declaraciones éticas o financieras obligatorias, reglas de conflicto, compensación diferida y límites a ingresos externos.",
    materialsPension: "Registros de pensión: resumen del plan, estimación reciente, historial de adquisición y servicio, contribuciones, opciones de sobreviviente, beneficiarios y órdenes previas de división.",
    materialsPrivacyNote: "Usa un portal seguro u otro método aprobado por el abogado; no envíes números de cuenta o documentos de identidad por correo electrónico sin protección.",
    attorneyMilitary: "Cómo afectan las normas federales militares, los años de servicio, la división del retiro, la discapacidad, el Survivor Benefit Plan y los límites de jurisdicción a los términos permitidos.",
    attorneyGovernment: "Si las reglas éticas, divulgaciones, conflictos, límites de ingresos externos o registros públicos del empleo o cargo gubernamental afectan el acuerdo.",
    attorneyPension: "Cómo tratar adquisición, años de servicio, acumulación antes y durante el matrimonio, valoración, beneficios de sobreviviente, beneficiarios y una futura orden de división.",
    localLawyersTitle: "Buscar abogados locales de derecho familiar",
    localLawyersIntro: "Los enlaces se basan en el estado seleccionado y la ciudad o código postal opcional.",
    localLawyersMap: "Buscar abogados cercanos de acuerdos prenupciales/postnupciales",
    localLawyersDirectory: "Consultar el directorio estatal de derecho familiar",
    localLawyersBar: "Buscar un servicio de referencia del colegio de abogados",
    localLawyersDisclaimer:
      "Estos son enlaces de búsqueda y referencia, no recomendaciones. Verifica licencia, estado profesional, experiencia, honorarios y conflictos. Cada pareja debe considerar abogado independiente.",
    attorneyTopicItems: [
      "Qué ley estatal debe regir, qué formalidades se exigen y con cuánta anticipación debe terminarse el acuerdo.",
      "Si cada persona debe tener abogado independiente y cómo documentar una negociación voluntaria e informada sin presión.",
      "Qué divulgación financiera se requiere, cómo confirmar valores y si deben adjuntarse listas de activos y deudas.",
      "Qué bienes y deudas son separados, matrimoniales o comunitarios y cómo la mezcla de fondos, el título o una refinanciación pueden cambiarlo.",
      "Cómo tratar ingresos futuros, bonos, acciones, crecimiento del negocio, inversiones, jubilación y plusvalía inmobiliaria.",
      "Cómo abordar manutención, vivienda, cuidados, discapacidad, educación o compensación por sacrificio profesional.",
      "Cómo manejar control empresarial, valoración, compra de participaciones, distribuciones y restricciones de negocios familiares.",
      "Cómo coordinar el acuerdo con testamentos, fideicomisos, seguros de vida, beneficiarios y derechos al fallecer.",
      "Si convienen revisiones periódicas, caducidad, reglas de modificación, mediación, honorarios u otros mecanismos de disputa.",
      "Si asuntos fiscales, migratorios, extranjeros o de ejecución internacional requieren otro especialista o abogado local."
    ],
    assetSnapshot: "Resumen de valores de activos",
    assetEstimateNote: "Estas son solo estimaciones de planificación y deben reemplazarse con cifras formales antes de firmar.",
    lossExposureTitle: "Lo que podría estar en juego sin un acuerdo",
    lossExposureIntro:
      "Sin un acuerdo prenupcial o postnupcial, las reglas estatales predeterminadas—no el plan escrito de la pareja—pueden controlar las disputas sobre bienes, crecimiento, deudas y manutención.",
    lossExposureValueLabel: "Valor ingresado relacionado con los temas señalados",
    lossExposureValueNote: "Este es el valor relacionado con los temas seleccionados, no una estimación de lo que alguien perdería.",
    lossExposureDisclaimer:
      "La posible exposición no significa una pérdida automática. El resultado depende de la titularidad, el momento, el rastreo, la ley estatal, la validez del acuerdo y los hechos del divorcio.",
    sourceNotes: "Notas de fuente"
  },
  ar: {
    brandTitle: "هل أحتاج إلى اتفاق قبل الزواج؟",
    brandSubtitle: "تقييم الجاهزية وتحديد المسائل",
    boundaryNote: "للتخطيط التعليمي فقط. هذه الأداة لا تصيغ اتفاقا ولا تغني عن الاستشارة القانونية.",
    languageLabel: "اللغة",
    planningValue: "قيمة التخطيط",
    steps: { path: "المسار", timing: "التوقيت", assets: "الأصول", complexity: "التعقيد", consequences: "العواقب", report: "التقرير" },
    yes: "نعم",
    no: "لا",
    unsure: "غير متأكد",
    back: "السابق",
    next: "التالي",
    prenupStep: "قبل الزواج",
    postnupStep: "بعد الزواج",
    pathTitle: "الحالة الزوجية",
    prenupReadiness: "جاهزية اتفاق ما قبل الزواج",
    prenupReadinessText: "لمن يفكر في الزواج أو مخطوب بالفعل.",
    postnupReadiness: "جاهزية اتفاق ما بعد الزواج",
    postnupReadinessText: "لمن هو متزوج بالفعل أو في شراكة قانونية.",
    coupleProfileTitle: "ملف الزوجين (اختياري)",
    coupleTypeQuestion: "كيف يصف الزوجان علاقتهما؟",
    coupleTypeDifferent: "زوجان من جنسين مختلفين",
    coupleTypeSame: "زوجان من الجنس نفسه",
    coupleTypeAnother: "وصف آخر",
    preferNotToSay: "أفضل عدم الإجابة",
    citizenshipQuestion: "ما وضع الجنسية الأمريكية للزوجين؟",
    citizenshipBoth: "كلاهما مواطن أمريكي",
    citizenshipOne: "أحدهما مواطن أمريكي",
    citizenshipNeither: "لا أحد منهما مواطن أمريكي",
    citizenshipCountriesQuestion: "دول الجنسية أو السياق العابر للحدود (اختياري)",
    citizenshipCountriesPlaceholder: "مثال: الولايات المتحدة وكندا",
    militaryQuestion: "هل يخدم أحد الطرفين حاليا أو خدم سابقا في الجيش أو لديه مزايا تقاعد أو بقاء عسكرية؟",
    governmentQuestion: "هل يعمل أحد الطرفين لدى جهة حكومية أو يشغل منصبا عاما منتخبا أو معينا؟",
    pensionQuestion: "هل لدى أحد الطرفين أو يتوقع معاشا أو خطة تقاعد ذات مزايا محددة؟",
    publicBenefitsDetailsQuestion: "تفاصيل الخدمة العسكرية أو الحكومية أو المعاش (اختياري)",
    publicBenefitsDetailsPlaceholder: "مثال: احتياط الجيش؛ موظف فدرالي؛ معاش معلم حكومي بعد 25 سنة",
    publicBenefitsTitle: "ملف الخدمة العسكرية والعامة والمعاش",
    militaryLabel: "الخدمة أو المزايا العسكرية",
    governmentLabel: "العمل الحكومي أو المنصب العام",
    pensionLabel: "المعاش الحالي أو المتوقع",
    detailsLabel: "التفاصيل المقدمة",
    marriageLicenseState: "في أي ولاية سيتم تقديم رخصة الزواج؟",
    localityQuestion: "المدينة أو الرمز البريدي (اختياري — يستخدم فقط لإنشاء روابط لمحامين محليين)",
    localityPlaceholder: "مثال: بوسطن أو 02108",
    timingPrenup: "توقيت الزفاف والإجراءات",
    timingPostnup: "جاهزية إجراءات ما بعد الزواج",
    weddingMonths: "كم شهرا تبقى على الزفاف؟",
    topicDiscussed: "هل تمت مناقشة الموضوع مع الشخص الآخر؟",
    counsel: "هل تحدث أي من الطرفين مع محام؟",
    disclosureStarted: "هل بدأت الإفصاحات أو المستندات المالية؟",
    pressure: "هل يشعر أحد بالاستعجال أو الضغط؟",
    conversationEyebrow: "بداية للمحادثة",
    conversationTitle: "كيف تطرح الموضوع من دون أن تجعل العشاء غريبا",
    conversationIntro: "استخدم هذا كنقطة بداية وعدله ليشبه أسلوبك. الهدوء والبدء مبكرا والتعامل كفريق أهم من الكلمات المثالية.",
    conversationOpenPrenupFirst: "حسنا، لدي موضوع رومانسي للغاية على جدول الأعمال: الأوراق. أريد أن نتحدث عن اتفاق ما قبل الزواج.",
    conversationOpenPrenupFollowup: "هل يمكننا العودة إلى حديث اتفاق ما قبل الزواج؟ أعدك أنني لا أحاول تحويل علاقتنا إلى صفحة شروط وأحكام.",
    conversationOpenPostnupFirst: "أعرف أن «اتفاق ما بعد الزواج» لا ينافس الزهور على لقب أكثر كلمات السنة رومانسية، لكنني أريد أن نتحدث عنه.",
    conversationOpenPostnupFollowup: "هل يمكننا العودة إلى حديث اتفاق ما بعد الزواج؟ أريد أن نناقشه بهدوء بدلا من تركه يتحول إلى غيمة غامضة ومزعجة.",
    conversationCorePrenup: "لا أطرح هذا لأنني أتوقع فشلنا أو أخطط لمخرج. أنا أهتم بعلاقتنا، وأفضل أن نوضح التوقعات المالية ونحن في فريق واحد بدلا من ترك القرارات الصعبة لقواعد الطلاق الافتراضية لاحقا.",
    conversationCorePostnup: "لا أطرح هذا لأنني أعتقد أن هناك خطأ في زواجنا. أنا أهتم بزواجنا، وأرى أن كتابة توقعات مالية واضحة قد تحمينا معا وتمنع سوء الفهم لاحقا.",
    conversationAssetSpecific:
      "أريد بصورة خاصة أن نضع قواعد واضحة بشأن {topics}، لأن التخطيط لها معا الآن أسهل من إعادة بناء التفاصيل أثناء نزاع.",
    conversationSameSex:
      "وبصفتنا زوجين من الجنس نفسه، أريد أن تعكس خطتنا علاقتنا بدقة، وإذا كانت هناك دولة أخرى معنية، أن نراعي أن الاعتراف والحماية ليسا متماثلين في كل مكان.",
    conversationMixedCitizenship:
      "لأن جنسيتنا وروابطنا القانونية قد تصلنا بأكثر من دولة{countries}، أريد أن نتأكد من أن الاتفاق يعمل عبر الحدود بدلا من افتراض أن مجموعة قواعد واحدة تتبعنا في كل مكان.",
    conversationBothCitizensForeign:
      "حتى مع كوننا مواطنين أمريكيين، فإن الملكية أو الصلة الأجنبية تحتاج إلى تخطيط مستقل لأن الجنسية لا تلغي قواعد الملكية أو الأسرة في دولة أخرى.",
    conversationFamilySpecific:
      "أريد أيضا أن نفكر بعناية في الأطفال والسكن والدعم وأي تضحيات مهنية، لكي يحمي الاتفاق الطرف الذي يقدم تلك المساهمات أيضا.",
    conversationPublicBenefits:
      "ينبغي أيضا أن نفهم المزايا العسكرية أو الحكومية وأي معاش، بما في ذلك الاستحقاق وخيارات البقاء وما يجوز قانونا تقسيمه أو التنازل عنه.",
    conversationFairness: "أريد أن تكون العملية والاتفاق عادلين لكلينا، لا وسيلة لكي «يفوز» طرف. ينبغي أن نكون صريحين بشأن المال، وأن نحصل على وقت للتفكير، وأن يتمكن كل منا من طلب مشورة قانونية مستقلة.",
    conversationRush: "لأن الوقت ضيق، لا أريد أن يشعر أي منا بالضغط. إذا لم يكن هناك وقت كاف للقيام بهذا بشكل صحيح، فلنسأل المحامين عن جدول زمني عادل بدلا من فرض توقيع متسرع.",
    conversationAsk: "هل أنت مستعد/ة للحديث عما يريد كل منا حمايته، وما الذي يبدو عادلا، وما الأسئلة التي ينبغي أن نطرحها على محاميين مستقلين؟",
    conversationTipsTitle: "ملاحظات عند طرح الموضوع",
    conversationTips: [
      "اختر وقتا هادئا وخاصا، لا أثناء شجار أو أمام العائلة أو قبل موعد متعلق بالزفاف بخمس دقائق.",
      "ابدأ بفكرة حماية الطرفين وخلق الوضوح؛ وتجنب البدء بعبارة «أحتاج إلى حماية ممتلكاتي».",
      "تعامل مع الحديث الأول كمحادثة، لا كمطالبة بإجابة أو توقيع فوري."
    ],
    copyScript: "نسخ النص",
    copiedScript: "تم النسخ",
    assetsTitle: "الأصول الحالية والمستقبلية",
    currentTopics: "المواضيع المالية الحالية",
    estimatedCurrentValues: "القيم الحالية المقدرة",
    futureTopics: "مواضيع الأصول المستقبلية",
    estimatedFutureValues: "القيم المستقبلية المقدرة",
    currentTotal: "الإجمالي الحالي المقدر:",
    futureTotal: "الإجمالي المستقبلي المقدر:",
    complexityTitle: "عوامل التعقيد",
    internationalQuestion: "هل توجد أصول حالية أو متوقعة خارج الولايات المتحدة؟",
    foreignCountry: "الدولة أو الولاية القضائية الأجنبية المرتبطة بالأصل",
    incomeGap: "هل توجد فجوة كبيرة في الدخل أو الثروة؟",
    incomeGrowthTitle: "الدخل المتوقع ونموه خلال الزواج",
    currentIncome: "الدخل السنوي الحالي المقدر",
    expectedIncome: "الدخل السنوي المستقبلي المتوقع",
    incomeGrowthContext: "سياق نمو الدخل المتوقع",
    business: "هل يملك أحد الطرفين أو يتوقع امتلاك عمل تجاري؟",
    realEstate: "هل توجد عقارات؟",
    combinedFactors: "هل توجد ديون أو قروض طلابية أو أطفال أو تضحيات مهنية؟",
    debt: "الدين",
    children: "الأطفال",
    careerSacrifice: "تضحية مهنية",
    planningReport: "تقرير التخطيط",
    valueInDiscussing: "قيمة في مناقشة اتفاق",
    downloadPdf: "تنزيل PDF",
    whyImportant: "لماذا قد يكون اتفاق ما قبل الزواج مهما",
    whyPostnupImportant: "لماذا قد يكون اتفاق ما بعد الزواج مهما",
    whyImportantItems: [
      "يستبدل الافتراضات الخاصة بتوقعات مكتوبة حول الملكية والمشاركة والديون والدعم.",
      "يمكنه تحديد ما يبقى ملكية منفصلة وما يصبح ملكية زوجية أو مشتركة وكيف تعالج مساهمات الطرفين وخلط الأموال.",
      "يمكنه تناول النمو المستقبلي لا الأرصدة الحالية فقط، بما في ذلك نمو الأعمال والاستثمارات والرواتب والمكافآت وحقوق العقار.",
      "يمكنه توزيع المسؤولية عن الديون الحالية والمستقبلية والنفقات الكبيرة والضرائب والممتلكات المشتركة.",
      "يمكنه حماية الطرف الأقل ثراء أيضا من خلال السكن أو الدعم أو التضحية المهنية أو الرعاية أو فترة انتقال بعد الانفصال.",
      "قد يكشف الإفصاح والتفاوض التوقعات المالية مبكرا بينما يتعاون الطرفان وقبل نشوء نزاع.",
      "قد تقلل الشروط الواضحة عدم اليقين والرسوم القانونية والمسائل التي يقررها القضاء، مع أن أي اتفاق لا يمنع كل نزاع."
    ],
    whyImportantStateTemplate:
      "من دون اتفاق، قد تحكم القواعد الافتراضية في {state} كثيرا من المسائل المالية بدلا من التفاهم غير الرسمي بين الطرفين.",
    whyImportantSelectedTemplate:
      "لهذا الزوجين، يمكن للاتفاق معالجة {topics} قبل أن تصبح القيم أو الملكية أو التوقعات أصعب في الفصل.",
    whyImportantFamily:
      "إذا كان هناك أطفال أو رعاية أو تضحية مهنية، يمكن للمناقشة أن تشمل حماية متبادلة لا حماية الأصول وحدها.",
    whyImportantInternational:
      "تجعل الأصول أو الروابط العابرة للحدود القانون الحاكم والاعتراف والملكية والميراث والتنفيذ مسائل تستحق المعالجة قبل النزاع.",
    mostAtRisk: "ما قد يكون أكثر عرضة للخطر",
    stateContext: "سياق الولاية",
    foreignLawNote: "ملاحظة عن القانون الحاكم للأصول الأجنبية",
    foreignAgreementTreatment: "كيفية التعامل مع الاتفاقات",
    foreignPropertyRules: "قواعد الملكية والميراث",
    foreignFormalities: "الإجراءات المحلية التي قد تكون مهمة",
    foreignWatchItems: "مسائل يجب التحقق منها",
    foreignQuestions: "أسئلة للمحامي المحلي",
    foreignCoupleChecks: "فحوص عابرة للحدود خاصة بالزوجين",
    foreignSources: "مصادر التحقق",
    foreignDisclaimer:
      "هذه قائمة مسائل خاصة بالولاية القضائية وليست رأيا قانونيا. قد تغير الإقامة والجنسية وموقع الأصل والمحكمة التي تنظر القضية مستقبلا النتيجة.",
    incomeAndGrowth: "الدخل المتوقع والنمو",
    whyNeedPlanning: "لماذا قد تحتاج هذه الحالة إلى تخطيط",
    recommendedNextSteps: "الخطوات التالية المقترحة",
    estimatedCost: "التكلفة المقدرة للمحامي",
    stateAdjustment: "المعيار الخاص بالولاية:",
    costDriverLabel: "عوامل التكلفة الرئيسية:",
    costSourceLabel: "مصدر معيار الأتعاب",
    attorneyTopics: "مواضيع النقاش مع المحامي",
    materialsTitle: "المستندات والمواد المطلوب جمعها",
    materialsIntro: "أحضرا سجلات حديثة وكاملة للطرفين قدر الإمكان. قد يطلب المحامي فترة زمنية مختلفة أو مستندات إضافية.",
    materialsCoreItems: [
      "هوية رسمية ومعلومات الاتصال وتاريخ الزفاف أو شهادة الزواج وأي اتفاقات سابقة متعلقة بالزواج أو الطلاق أو الدعم أو الملكية.",
      "كشوف حديثة للحسابات الجارية والادخار والاستثمار والعملات الرقمية وغيرها، مع بيان الملكية وتاريخ الفتح التقريبي.",
      "سجلات التقاعد والتعويض المؤجل، بما فيها المعاش وخيارات الأسهم والمكافآت ومزايا العمل.",
      "الإقرارات الضريبية لآخر سنتين أو ثلاث وقسائم الرواتب الحديثة وعقود العمل ومستندات الدخل الآخر.",
      "كشوف الديون الحالية للرهن والقروض الطلابية وبطاقات الائتمان والقروض الشخصية والضرائب والضمانات والالتزامات الأخرى.",
      "قائمة بالممتلكات الشخصية القيمة والهدايا أو الميراث المتوقع وكل ما يرى أي طرف أنه يجب أن يبقى منفصلا."
    ],
    materialsBusiness: "سجلات الأعمال: وثائق التأسيس والإدارة والملكية واتفاقات البيع والشراء والبيانات المالية والضريبية الحديثة والتقييمات والقروض.",
    materialsRealEstate: "سجلات العقار: السندات ووثائق الشراء والإغلاق وكشوف الرهن والتقييمات وعقود الإيجار وإثبات الدفعات أو التجديدات أو المساهمات.",
    materialsEstate: "سجلات التركة وثروة الأسرة: وثائق الائتمان والوصايا والهدايا أو الميراث وتعيينات المستفيدين والقيود العائلية ذات الصلة.",
    materialsInternational: "السجلات العابرة للحدود: سندات أجنبية وكشوف حساب ووثائق الزواج أو الجنسية والضرائب والاتفاقات القائمة والترجمات المعتمدة عند الحاجة.",
    materialsPostnup: "لسياق ما بعد الزواج: مستندات التحويلات أو المشتريات الكبيرة أثناء الزواج وتاريخ الحسابات المشتركة ووثائق التركة وأي وعود مالية مكتوبة.",
    materialsMilitary: "السجلات العسكرية: أوامر الخدمة أو وضعها وكشوف الأجر وتقديرات التقاعد وكشوف خطة الادخار وخيارات مزايا البقاء ومعلومات العجز.",
    materialsGovernment: "سجلات العمل الحكومي أو المنصب العام: ملخصات العمل والمزايا والإفصاحات الأخلاقية أو المالية وقواعد تعارض المصالح والتعويض المؤجل وقيود الدخل الخارجي.",
    materialsPension: "سجلات المعاش: ملخص الخطة وتقدير المزايا وسجل الاستحقاق والخدمة والمساهمات وخيارات البقاء والمستفيدين وأوامر التقسيم السابقة.",
    materialsPrivacyNote: "استخدما بوابة آمنة أو وسيلة يعتمدها المحامي؛ لا ترسلا أرقام الحسابات أو وثائق الهوية عبر بريد إلكتروني عادي.",
    attorneyMilitary: "كيفية تأثير قواعد المزايا العسكرية الفدرالية ومدة الخدمة وتقسيم التقاعد والعجز وتغطية البقاء وحدود الاختصاص على الشروط الممكنة.",
    attorneyGovernment: "ما إذا كانت قواعد أخلاقيات الوظيفة أو المنصب الحكومي والإفصاحات والتعارضات وقيود الدخل أو السجلات العامة تؤثر في الاتفاق.",
    attorneyPension: "كيفية معالجة استحقاق المعاش وسنوات الخدمة والتراكم قبل الزواج وخلاله والتقييم ومزايا البقاء والمستفيدين وأي أمر تقسيم مستقبلي.",
    localLawyersTitle: "العثور على محامي أسرة محليين",
    localLawyersIntro: "تعتمد روابط البحث على الولاية المختارة والمدينة أو الرمز البريدي الاختياري.",
    localLawyersMap: "البحث عن محامي اتفاقات قبل/بعد الزواج بالقرب منك",
    localLawyersDirectory: "تصفح دليل محامي الأسرة في الولاية",
    localLawyersBar: "العثور على خدمة إحالة تابعة لنقابة المحامين",
    localLawyersDisclaimer:
      "هذه روابط للبحث والإحالة وليست تزكية. تحقق من الترخيص والوضع المهني والخبرة والرسوم وتعارض المصالح. ينبغي لكل طرف التفكير في محام مستقل.",
    attorneyTopicItems: [
      "قانون الولاية الذي ينبغي أن يحكم والإجراءات الشكلية المطلوبة والموعد المناسب لإكمال الاتفاق.",
      "ما إذا كان لكل طرف محام مستقل وكيف يوثق تفاوض طوعي ومستنير من دون ضغط.",
      "الإفصاح المالي المطلوب وكيفية تأكيد القيم وما إذا كان يجب إرفاق جداول للأصول والديون.",
      "تصنيف الأصول والديون وكيف قد يغير خلط الأموال أو إعادة التمويل أو تغيير العنوان ذلك التصنيف.",
      "معالجة الأرباح والمكافآت والأسهم ونمو الأعمال والاستثمارات والتقاعد وحقوق العقار مستقبلا.",
      "معالجة الدعم والسكن والرعاية والإعاقة والتعليم أو التعويض عن التضحية المهنية.",
      "إدارة السيطرة على الأعمال والتقييم والشراء والتوزيعات والقيود على الأعمال العائلية.",
      "تنسيق الاتفاق مع الوصايا والائتمانات والتأمين على الحياة والمستفيدين والحقوق عند الوفاة.",
      "إضافة مواعيد مراجعة أو انتهاء أو قواعد تعديل أو وساطة أو أتعاب أو آليات أخرى لحل النزاع.",
      "ما إذا كانت مسائل الضرائب أو الهجرة أو الملكية الأجنبية أو التنفيذ عبر الحدود تحتاج إلى متخصص آخر أو محام محلي."
    ],
    assetSnapshot: "ملخص قيمة الأصول",
    assetEstimateNote: "هذه تقديرات للتخطيط فقط ويجب استبدالها بأرقام إفصاح رسمية قبل التوقيع.",
    lossExposureTitle: "ما الذي قد يكون معرضا للخطر من دون اتفاق",
    lossExposureIntro:
      "من دون اتفاق قبل الزواج أو بعده، قد تتحكم القواعد الافتراضية للولاية—لا الخطة المكتوبة للزوجين—في نزاعات الممتلكات والنمو والديون والدعم.",
    lossExposureValueLabel: "القيمة المدخلة المرتبطة بالمواضيع المحددة",
    lossExposureValueNote: "هذه هي القيمة المرتبطة بالمواضيع المختارة، وليست تقديرا لما قد يخسره أي طرف.",
    lossExposureDisclaimer:
      "التعرض المحتمل لا يعني خسارة تلقائية. تعتمد النتيجة على الملكية والتوقيت وإثبات المصدر وقانون الولاية وقابلية التنفيذ ووقائع الطلاق.",
    sourceNotes: "ملاحظات المصادر"
  },
  zh: {
    brandTitle: "我需要婚前协议吗？",
    brandSubtitle: "准备度与问题识别",
    boundaryNote: "仅用于教育性规划。本工具不会起草协议，也不能替代律师建议。",
    languageLabel: "语言",
    planningValue: "规划价值",
    steps: { path: "路径", timing: "时间", assets: "资产", complexity: "复杂度", consequences: "后果", report: "报告" },
    yes: "是",
    no: "否",
    unsure: "不确定",
    back: "返回",
    next: "下一步",
    prenupStep: "婚前协议",
    postnupStep: "婚后协议",
    pathTitle: "婚姻状态",
    prenupReadiness: "婚前协议准备度",
    prenupReadinessText: "适用于正在考虑结婚或已经订婚的人。",
    postnupReadiness: "婚后协议准备度",
    postnupReadinessText: "适用于已经结婚或处于法律伴侣关系的人。",
    coupleProfileTitle: "伴侣情况（可选）",
    coupleTypeQuestion: "双方如何描述这段关系？",
    coupleTypeDifferent: "异性伴侣",
    coupleTypeSame: "同性伴侣",
    coupleTypeAnother: "其他描述",
    preferNotToSay: "不愿说明",
    citizenshipQuestion: "双方的美国公民身份情况是什么？",
    citizenshipBoth: "双方都是美国公民",
    citizenshipOne: "一方是美国公民",
    citizenshipNeither: "双方都不是美国公民",
    citizenshipCountriesQuestion: "公民所属国家或跨境背景（可选）",
    citizenshipCountriesPlaceholder: "例如：美国和加拿大",
    militaryQuestion: "任何一方目前或曾经服役，或拥有军人退休金或遗属福利吗？",
    governmentQuestion: "任何一方在政府工作，或担任民选或任命的公职吗？",
    pensionQuestion: "任何一方拥有或预计获得养老金或其他固定收益退休计划吗？",
    publicBenefitsDetailsQuestion: "军队、政府或养老金详情（可选）",
    publicBenefitsDetailsPlaceholder: "例如：陆军预备役；联邦雇员；工作25年后可领取州教师养老金",
    publicBenefitsTitle: "军队、公共服务和养老金情况",
    militaryLabel: "服役或军人福利",
    governmentLabel: "政府就业或公职",
    pensionLabel: "当前或预期养老金",
    detailsLabel: "已提供详情",
    marriageLicenseState: "结婚许可证将在哪个州提交？",
    localityQuestion: "城市或邮政编码（可选；仅用于生成本地律师链接）",
    localityPlaceholder: "例如：Boston 或 02108",
    timingPrenup: "婚礼时间与流程",
    timingPostnup: "婚后协议流程准备度",
    weddingMonths: "距离婚礼还有几个月？",
    topicDiscussed: "是否已和对方讨论过这个话题？",
    counsel: "任一方是否已经咨询过律师？",
    disclosureStarted: "是否已经开始准备财务披露或文件？",
    pressure: "是否有人感到仓促或受压？",
    conversationEyebrow: "谈话开场",
    conversationTitle: "怎样提出这个话题，而不让晚餐突然尴尬",
    conversationIntro: "把这当作起点，再改成你自己的说话方式。冷静、尽早、共同面对，比措辞完美更重要。",
    conversationOpenPrenupFirst: "好吧，我有一个极其浪漫的议题：文书工作。我想和你谈谈婚前协议。",
    conversationOpenPrenupFollowup: "我们可以继续聊聊婚前协议吗？我保证，我不是想把我们的关系变成一页“条款与条件”。",
    conversationOpenPostnupFirst: "我知道“婚后协议”大概不会和鲜花竞争年度最浪漫词汇，但我想和你谈谈这件事。",
    conversationOpenPostnupFollowup: "我们可以继续聊聊婚后协议吗？我希望我们认真讨论，而不是让它变成一团模糊又尴尬的乌云。",
    conversationCorePrenup: "我提出这件事，不是因为我觉得我们会失败，也不是因为我在准备退路。我在乎我们，也希望趁我们站在同一边时把财务预期说清楚，而不是以后把困难决定全部交给默认离婚法律。",
    conversationCorePostnup: "我提出这件事，不是因为我觉得我们的婚姻出了问题。我在乎我们的婚姻，也认为把清楚的财务预期写下来，可以保护我们双方并减少以后的误会。",
    conversationAssetSpecific:
      "我尤其希望我们为{topics}制定清楚规则，因为现在一起规划，比发生争议后再重建事实容易得多。",
    conversationSameSex:
      "作为同性伴侣，我也希望这份计划准确反映我们的关系；如果涉及其他国家，还要考虑各地对婚姻的承认和保护并不完全相同。",
    conversationMixedCitizenship:
      "由于我们的公民身份和法律联系可能涉及多个国家{countries}，我希望协议真正能应对跨境情况，而不是假设同一套规则会跟随我们到任何地方。",
    conversationBothCitizensForeign:
      "即使我们双方都是美国公民，外国财产或法律联系仍需要单独规划，因为公民身份不会取代另一个国家的产权或家庭法规则。",
    conversationFamilySpecific:
      "我也希望我们认真考虑子女、住房、扶养和任何职业牺牲，让协议也能保护作出这些贡献的一方。",
    conversationPublicBenefits:
      "我们也应该了解军队或政府福利以及养老金的运作方式，包括归属、遗属选择，以及哪些权益依法可以分割或放弃。",
    conversationFairness: "我希望过程和协议对我们双方都公平，而不是让某一个人“赢”。我们都应该诚实披露财务情况，有时间思考，并且可以分别获得自己的法律建议。",
    conversationRush: "因为时间比较紧，我不希望任何一方感到被逼迫。如果时间不足以妥善处理，我们应该问律师怎样的时间安排才公平，而不是仓促签字。",
    conversationAsk: "你愿意和我一起谈谈我们各自想保护什么、怎样才算公平，以及我们应该分别向律师提出哪些问题吗？",
    conversationTipsTitle: "表达建议",
    conversationTips: [
      "选择安静、私密的时间；不要在争吵时、家人面前，或婚礼安排前五分钟提出。",
      "先强调保护双方和建立清晰预期；避免一开口就说“我需要保护我的东西”。",
      "把第一次谈话当成交流，而不是要求对方立刻回答或签字。"
    ],
    copyScript: "复制话术",
    copiedScript: "已复制",
    assetsTitle: "当前和未来资产",
    currentTopics: "当前财务事项",
    estimatedCurrentValues: "当前估值",
    futureTopics: "未来资产事项",
    estimatedFutureValues: "未来估值",
    currentTotal: "当前估计总额：",
    futureTotal: "未来估计总额：",
    complexityTitle: "复杂因素",
    internationalQuestion: "是否有当前或预期资产位于美国境外？",
    foreignCountry: "与资产相关的外国国家或司法辖区",
    incomeGap: "是否存在明显收入或财富差距？",
    incomeGrowthTitle: "婚姻期间的预期收入和增长",
    currentIncome: "当前估计年收入",
    expectedIncome: "未来预期年收入",
    incomeGrowthContext: "收入增长背景",
    business: "任一方是否拥有或预计拥有企业？",
    realEstate: "是否涉及房地产？",
    combinedFactors: "是否涉及债务、学生贷款、子女或职业牺牲？",
    debt: "债务",
    children: "子女",
    careerSacrifice: "职业牺牲",
    planningReport: "规划报告",
    valueInDiscussing: "讨论协议的价值",
    downloadPdf: "下载 PDF",
    whyImportant: "为什么婚前协议可能重要",
    whyPostnupImportant: "为什么婚后协议可能重要",
    whyImportantItems: [
      "它以书面约定取代双方对所有权、共享、债务和扶养问题的私下假设。",
      "它可以界定哪些财产保持个人所有、哪些成为婚内或共同财产，以及混同资金和共同投入如何处理。",
      "它可以处理未来增长，而不只是当前余额，包括企业增值、投资收益、加薪、奖金和房产权益。",
      "它可以分配现有及未来债务、重大支出、税务和共同购置财产的责任。",
      "它也可以保护财力较弱的一方，例如约定住房、扶养、职业牺牲、照护或分居后的过渡安排。",
      "披露和协商过程可以在双方仍合作时及早发现财务期待，而不是等到冲突发生后。",
      "清晰条款可以减少不确定性、律师费和需要法院决定的问题，但任何协议都无法消除所有争议。"
    ],
    whyImportantStateTemplate:
      "如果没有协议，{state}的默认规则，而非双方的非正式理解，可能决定许多财务问题。",
    whyImportantSelectedTemplate:
      "就这对伴侣而言，协议可以在价值、所有权或期待变得更难厘清前处理{topics}。",
    whyImportantFamily:
      "如涉及子女、照护或职业牺牲，讨论可以包含双方保护，而不只是资产隔离。",
    whyImportantInternational:
      "跨境资产或国籍联系使适用法律、承认、产权、继承和执行问题值得在争议前处理。",
    mostAtRisk: "最可能存在风险的事项",
    stateContext: "州法律背景",
    foreignLawNote: "外国资产适用法律提示",
    foreignAgreementTreatment: "当地如何对待协议",
    foreignPropertyRules: "财产与继承规则",
    foreignFormalities: "可能重要的当地手续",
    foreignWatchItems: "需要核实的问题",
    foreignQuestions: "向当地律师提出的问题",
    foreignCoupleChecks: "针对双方情况的跨境核实事项",
    foreignSources: "核实资料来源",
    foreignDisclaimer:
      "这是针对该司法辖区的问题清单，不是法律意见。居住地、国籍、资产所在地以及未来审理案件的法院都可能改变结果。",
    incomeAndGrowth: "预期收入和增长",
    whyNeedPlanning: "为什么此情况可能需要规划",
    recommendedNextSteps: "建议的下一步",
    estimatedCost: "律师费用估计",
    stateAdjustment: "州级费用基准：",
    costDriverLabel: "主要费用因素：",
    costSourceLabel: "费率基准来源",
    attorneyTopics: "与律师讨论的事项",
    materialsTitle: "需要准备的文件和材料",
    materialsIntro: "尽可能准备双方近期且完整的记录。律师可能要求不同期间或其他补充文件。",
    materialsCoreItems: [
      "政府签发的身份证明、联系方式、婚礼日期或结婚证，以及以往婚姻、离婚、扶养或财产协议。",
      "近期银行、储蓄、投资、加密货币及其他账户对账单，并注明账户所有人和大致开户时间。",
      "退休及递延薪酬资料，包括养老金、股票期权、限制性股票、奖金和雇主福利摘要。",
      "最近两至三年的报税表、近期工资单、雇佣合同及其他收入证明。",
      "房贷、学生贷款、信用卡、个人贷款、税务债务、担保及其他义务的当前对账单。",
      "贵重个人财产、预期赠与或继承，以及双方认为应保持个人所有的财产清单。"
    ],
    materialsBusiness: "企业资料：设立和治理文件、股权或资本表、买卖协议、近期财务报表和报税表、估值及未偿贷款。",
    materialsRealEstate: "房地产资料：产权证、购买和交割文件、房贷对账单、评估、租约及首付、装修或其他投入记录。",
    materialsEstate: "遗产和家族财富资料：信托、遗嘱、赠与或继承记录、受益人指定及相关家族限制。",
    materialsInternational: "跨境资料：外国产权文件、账户对账单、婚姻或公民身份文件、税务资料、现有协议及必要的认证翻译。",
    materialsPostnup: "婚后协议资料：婚姻期间重大转让或购买文件、共同账户历史、现有遗产规划文件及任何书面财务承诺。",
    materialsMilitary: "军队资料：当前命令或服役状态、工资单、退役积分或养老金估算、节俭储蓄计划对账单、遗属福利选择和伤残福利资料。",
    materialsGovernment: "政府或公职资料：就业和福利摘要、强制伦理或财务披露、利益冲突规则、递延薪酬及外部收入限制。",
    materialsPension: "养老金资料：计划摘要、近期福利估算、归属和服务年限记录、缴费、遗属选项、受益人指定及以往分割命令。",
    materialsPrivacyNote: "使用律师批准的安全门户或其他方式；不要通过普通电子邮件随意发送账号或身份证明。",
    attorneyMilitary: "联邦军人福利规则、服役期间、退休金分割、伤残福利、遗属福利计划和管辖限制如何影响可约定条款。",
    attorneyGovernment: "公职或政府就业的伦理规则、强制披露、利益冲突、外部收入限制或公共记录问题是否影响协议或协商。",
    attorneyPension: "如何处理养老金归属、服务年限、婚前婚内累积、估值、遗属福利、受益人选择及未来财产分割命令。",
    localLawyersTitle: "查找当地家庭法律师",
    localLawyersIntro: "搜索链接会根据所选州以及可选的城市或邮政编码生成。",
    localLawyersMap: "搜索附近的婚前/婚后协议律师",
    localLawyersDirectory: "浏览本州家庭法律师名录",
    localLawyersBar: "查找律师协会推荐服务",
    localLawyersDisclaimer:
      "这些是搜索和推荐服务链接，不代表背书。请核实执业资格、当前状态、相关协议经验、费用和利益冲突。双方应考虑分别聘请律师。",
    attorneyTopicItems: [
      "应适用哪个州的法律、签署需要哪些手续，以及应提前多久完成协议。",
      "双方是否应各自聘请律师，以及如何记录自愿、知情且无压力的协商过程。",
      "需要哪些财务披露、如何确认估值，以及是否应附资产和债务清单。",
      "现有资产和债务如何分类，以及追踪、再融资、更名或资金混同会如何改变分类。",
      "未来收入、奖金、股权薪酬、企业增值、投资收益、退休金和房产权益如何处理。",
      "如何处理配偶扶养、住房、照护、残疾、教育或职业牺牲补偿。",
      "企业控制、估值、股权回购、分配、专业业务和家族企业限制如何处理。",
      "协议如何与遗嘱、信托、人寿保险、受益人指定和死亡时权利协调。",
      "是否加入复审日期、失效条款、修改规则、调解、费用或其他争议解决条款。",
      "税务、移民、外国财产或跨境执行问题是否需要其他专家或当地律师。"
    ],
    assetSnapshot: "资产价值摘要",
    assetEstimateNote: "这些只是规划估计，签署前应以正式披露数字替代。",
    lossExposureTitle: "没有协议时可能面临的损失",
    lossExposureIntro:
      "如果没有婚前或婚后协议，财产、增值、债务和扶养争议可能由州默认规则处理，而不是由双方自己的书面计划决定。",
    lossExposureValueLabel: "与已标记事项相关的输入价值",
    lossExposureValueNote: "这是与所选事项相关的价值，并不是任何一方可能损失金额的估计。",
    lossExposureDisclaimer:
      "潜在风险并不意味着必然损失。实际结果取决于所有权、时间、资金追踪、州法律、协议效力以及离婚时的具体事实。",
    sourceNotes: "资料说明"
  }
};

const assetTranslations = {
  es: {
    "Savings or investment accounts": "Cuentas de ahorro o inversión",
    "Retirement accounts": "Cuentas de jubilación",
    "Real estate": "Bienes raíces",
    "Business ownership": "Participación en negocio",
    "Family gifts": "Regalos familiares",
    "Expected inheritance": "Herencia esperada",
    "Student loans": "Préstamos estudiantiles",
    "Credit card or personal debt": "Tarjeta de crédito o deuda personal",
    "Future inheritance": "Herencia futura",
    "Foreign inheritance": "Herencia extranjera",
    "Family business interest": "Participación en negocio familiar",
    "Future home purchase": "Compra futura de vivienda",
    "Appreciation of separate property": "Aumento de valor de bienes separados",
    "Income from separate property": "Ingresos de bienes separados"
  },
  ar: {
    "Savings or investment accounts": "حسابات ادخار أو استثمار",
    "Retirement accounts": "حسابات التقاعد",
    "Real estate": "عقارات",
    "Business ownership": "ملكية عمل تجاري",
    "Family gifts": "هدايا عائلية",
    "Expected inheritance": "ميراث متوقع",
    "Student loans": "قروض طلابية",
    "Credit card or personal debt": "بطاقة ائتمان أو دين شخصي",
    "Future inheritance": "ميراث مستقبلي",
    "Foreign inheritance": "ميراث أجنبي",
    "Family business interest": "حصة في عمل عائلي",
    "Future home purchase": "شراء منزل مستقبلا",
    "Appreciation of separate property": "زيادة قيمة الملكية المنفصلة",
    "Income from separate property": "دخل من ملكية منفصلة"
  },
  zh: {
    "Savings or investment accounts": "储蓄或投资账户",
    "Retirement accounts": "退休账户",
    "Real estate": "房地产",
    "Business ownership": "企业所有权",
    "Family gifts": "家庭赠与",
    "Expected inheritance": "预期继承",
    "Student loans": "学生贷款",
    "Credit card or personal debt": "信用卡或个人债务",
    "Future inheritance": "未来继承",
    "Foreign inheritance": "海外继承",
    "Family business interest": "家族企业权益",
    "Future home purchase": "未来购房",
    "Appreciation of separate property": "个人财产增值",
    "Income from separate property": "个人财产收入"
  }
};

const assetOptions = [
  "Savings or investment accounts",
  "Retirement accounts",
  "Real estate",
  "Business ownership",
  "Family gifts",
  "Expected inheritance",
  "Student loans",
  "Credit card or personal debt"
];

const futureAssetOptions = [
  "Future inheritance",
  "Foreign inheritance",
  "Family business interest",
  "Future home purchase",
  "Appreciation of separate property",
  "Income from separate property"
];

const foreignAssetTypeOptions = [
  "Real estate or land",
  "Bank, brokerage, or cryptocurrency account",
  "Business or company interest",
  "Trust, gift, or inheritance",
  "Pension or retirement benefit",
  "Intellectual property or royalties",
  "Debt, guarantee, or tax obligation"
];

const stateDivorceBenchmarks = {
  AL: 3.0,
  AK: 3.1,
  AZ: 2.0,
  AR: 3.0,
  CO: 2.8,
  CT: 2.6,
  DE: 2.6,
  FL: 3.0,
  GA: 2.2,
  ID: 3.4,
  IL: 1.2,
  IA: 1.9,
  KS: 1.7,
  KY: 2.9,
  LA: 0.9,
  ME: 2.5,
  MD: 2.7,
  MA: 1.8,
  MI: 2.2,
  MS: 2.9,
  MO: 2.6,
  MT: 2.3,
  NE: 2.6,
  NV: 3.8,
  NH: 2.5,
  NJ: 2.2,
  NY: 2.4,
  NC: 2.7,
  ND: 2.6,
  OH: 2.4,
  OK: 3.3,
  OR: 2.8,
  PA: 2.2,
  RI: 2.3,
  SC: 2.2,
  SD: 2.3,
  TN: 2.9,
  TX: 2.1,
  UT: 3.1,
  VT: 2.4,
  VA: 2.7,
  WA: 2.7,
  WV: 2.9,
  WI: 2.1,
  WY: 3.4
};

const statesWithoutComparableCdcDivorceRate = new Set(["CA", "HI", "IN", "MN", "NM"]);
const nationalDivorceBenchmark = 2.4;
const divorceStatisticsSource = "https://www.cdc.gov/nchs/state-stats/more-maps/divorce.html";

function getCopy(language) {
  const selected = translations[language] ?? {};
  return {
    ...translations.en,
    ...selected,
    steps: {
      ...translations.en.steps,
      ...(selected.steps ?? {})
    }
  };
}

function getStepLabel(copy, stepId, mode) {
  if (stepId === "path") return mode === "postnup" ? copy.postnupStep : copy.prenupStep;
  return copy.steps[stepId];
}

function getWhyImportantItems(answers, copy, language, rule) {
  const items = [
    copy.whyImportantStateTemplate.replace("{state}", rule.name),
    ...copy.whyImportantItems
  ];
  const topics = new Set([...answers.currentAssets, ...answers.futureAssets]);

  if (answers.business === "yes") topics.add("Business ownership");
  if (answers.realEstate === "yes") topics.add("Real estate");
  if (answers.debts === "yes") topics.add("Credit card or personal debt");

  const selectedTopics = [...topics].slice(0, 4).map((topic) => translateAsset(topic, language));
  if (selectedTopics.length > 0) {
    items.push(copy.whyImportantSelectedTemplate.replace("{topics}", selectedTopics.join(", ")));
  }
  if (answers.children === "yes" || answers.careerSacrifice === "yes") {
    items.push(copy.whyImportantFamily);
  }
  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    items.push(copy.whyImportantInternational);
  }

  return items;
}

function getMaterialsChecklist(answers, copy) {
  const selectedAssets = [...answers.currentAssets, ...answers.futureAssets];
  const items = [...copy.materialsCoreItems];
  const hasBusiness =
    answers.business === "yes" || selectedAssets.some((asset) => asset === "Business ownership" || asset === "Family business interest");
  const hasRealEstate =
    answers.realEstate === "yes" || selectedAssets.some((asset) => asset === "Real estate" || asset === "Future home purchase");
  const hasEstateOrFamilyWealth = selectedAssets.some(
    (asset) => asset.includes("inheritance") || asset === "Family gifts" || asset === "Family business interest"
  );

  if (hasBusiness) items.push(copy.materialsBusiness);
  if (hasRealEstate) items.push(copy.materialsRealEstate);
  if (hasEstateOrFamilyWealth) items.push(copy.materialsEstate);
  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    items.push(copy.materialsInternational);
  }
  if (answers.mode === "postnup") items.push(copy.materialsPostnup);
  if (answers.militaryStatus === "yes") items.push(copy.materialsMilitary);
  if (answers.governmentStatus === "yes") items.push(copy.materialsGovernment);
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure") items.push(copy.materialsPension);

  return items;
}

function getAttorneyDiscussionTopics(answers, copy) {
  const topics = [...copy.attorneyTopicItems];
  if (answers.militaryStatus === "yes") topics.push(copy.attorneyMilitary);
  if (answers.governmentStatus === "yes") topics.push(copy.attorneyGovernment);
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure") topics.push(copy.attorneyPension);
  return topics;
}

function getPublicBenefitsSummary(answers, copy) {
  const lines = [];
  if (answers.militaryStatus) lines.push(`${copy.militaryLabel}: ${copy[answers.militaryStatus]}.`);
  if (answers.governmentStatus) lines.push(`${copy.governmentLabel}: ${copy[answers.governmentStatus]}.`);
  if (answers.pensionStatus) lines.push(`${copy.pensionLabel}: ${copy[answers.pensionStatus]}.`);
  if (answers.publicBenefitsDetails.trim()) {
    lines.push(`${copy.detailsLabel}: ${answers.publicBenefitsDetails.trim()}.`);
  }
  return lines;
}

function slugifyLocation(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getLocalLawyerLinks(answers, rule) {
  const location = [answers.locality.trim(), rule.name].filter(Boolean).join(", ");
  const searchQuery = `prenup postnup family law attorney ${location}`;

  return {
    location,
    links: [
      {
        key: "map",
        labelKey: "localLawyersMap",
        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`
      },
      {
        key: "directory",
        labelKey: "localLawyersDirectory",
        url: `https://www.justia.com/lawyers/family-law/${slugifyLocation(rule.name)}`
      },
      {
        key: "bar",
        labelKey: "localLawyersBar",
        url: "https://www.americanbar.org/groups/legal_services/flh-home/flh-bar-directories-and-lawyer-finders/"
      }
    ]
  };
}

function getConversationScript(answers, copy, language) {
  const isFollowUp = answers.discussedWithPartner === "yes";
  const isPrenup = answers.mode === "prenup";
  const weddingTimingIsTight =
    isPrenup && answers.weddingMonths !== "" && Number(answers.weddingMonths) >= 0 && Number(answers.weddingMonths) <= 3;
  const topicSet = new Set([...answers.currentAssets, ...answers.futureAssets]);
  if (answers.business === "yes") topicSet.add("Business ownership");
  if (answers.realEstate === "yes") topicSet.add("Real estate");
  if (answers.debts === "yes") topicSet.add("Credit card or personal debt");
  const selectedTopics = [...topicSet].slice(0, 3).map((topic) => translateAsset(topic, language));
  const lines = [
    isPrenup
      ? isFollowUp
        ? copy.conversationOpenPrenupFollowup
        : copy.conversationOpenPrenupFirst
      : isFollowUp
        ? copy.conversationOpenPostnupFollowup
        : copy.conversationOpenPostnupFirst,
    isPrenup ? copy.conversationCorePrenup : copy.conversationCorePostnup
  ];

  if (selectedTopics.length > 0) {
    lines.push(copy.conversationAssetSpecific.replace("{topics}", selectedTopics.join(", ")));
  }
  if (answers.coupleType === "same-sex") lines.push(copy.conversationSameSex);
  if (answers.citizenshipStatus === "one-us" || answers.citizenshipStatus === "neither-us") {
    const countries = answers.citizenshipCountries.trim() ? ` (${answers.citizenshipCountries.trim()})` : "";
    lines.push(copy.conversationMixedCitizenship.replace("{countries}", countries));
  } else if (
    answers.citizenshipStatus === "both-us" &&
    (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure")
  ) {
    lines.push(copy.conversationBothCitizensForeign);
  }
  if (answers.children === "yes" || answers.careerSacrifice === "yes") lines.push(copy.conversationFamilySpecific);
  if (answers.militaryStatus === "yes" || answers.governmentStatus === "yes" || answers.pensionStatus === "yes") {
    lines.push(copy.conversationPublicBenefits);
  }
  lines.push(copy.conversationFairness);
  if (answers.pressure === "yes" || weddingTimingIsTight) lines.push(copy.conversationRush);
  lines.push(copy.conversationAsk);
  return lines;
}

function getCoupleSpecificForeignChecks(answers) {
  const checks = [];
  if (answers.coupleType === "same-sex") {
    checks.push("Confirm that the foreign jurisdiction recognizes the marriage, a same-sex divorce, and marital agreements between the spouses; recognition is not uniform worldwide.");
  }
  if (answers.citizenshipStatus === "one-us") {
    checks.push("One spouse is a US citizen and one is not: confirm how each spouse's nationality, domicile, residence, and immigration status affect governing law and enforcement.");
  } else if (answers.citizenshipStatus === "neither-us") {
    checks.push("Neither spouse is a US citizen: confirm why the selected US state and any foreign jurisdiction would have authority over the agreement or a future dispute.");
  } else if (answers.citizenshipStatus === "both-us") {
    checks.push("Both spouses are US citizens, but US citizenship does not override foreign real-estate, registration, inheritance, tax, or enforcement rules.");
  }
  if (answers.citizenshipCountries.trim()) {
    checks.push(`Citizenship or cross-border context entered: ${answers.citizenshipCountries.trim()}. Local counsel should verify every listed country's connection.`);
  }
  if (answers.foreignResidence.trim()) {
    checks.push(`Residence, domicile, or expected-move context entered: ${answers.foreignResidence.trim()}. Confirm how each location affects jurisdiction, governing law, tax residence, and enforcement.`);
  }
  if (answers.foreignAssetTypes.length > 0) {
    checks.push(`Foreign asset types entered: ${answers.foreignAssetTypes.join(", ")}. Verify title, classification, valuation, transfer restrictions, and local registration for each type.`);
  }
  if (answers.foreignOwnership.trim()) {
    checks.push(`Foreign ownership or title entered: ${answers.foreignOwnership.trim()}. Confirm the legal owner, beneficial owner, source of funds, and whether another person or entity has rights.`);
  }
  if (answers.futureMoveAbroad === "yes" || answers.futureMoveAbroad === "unsure") {
    checks.push("A future move, job, or retirement abroad is possible. Counsel should consider a governing-law clause, forum selection, periodic review, and whether a coordinated local agreement is needed.");
  }
  if (answers.foreignAgreementStatus === "yes" || answers.foreignAgreementStatus === "unsure") {
    checks.push("An existing or possible foreign marital-regime document, trust instrument, or local contract must be reviewed for conflicts, amendment rules, and priority over a new US agreement.");
  }
  if (answers.foreignLanguageDocuments === "yes" || answers.foreignLanguageDocuments === "unsure") {
    checks.push("Foreign-language records may require certified translation, an interpreter, and proof that each person understood the agreement and disclosure materials.");
  }
  return checks;
}

function getAgreementComplexityAnalysis(answers, foreignLawContext) {
  const factors = [];
  let score = 0;
  const hasForeignConnection = answers.internationalAssets === "yes" || answers.internationalAssets === "unsure";
  const addFactor = (title, detail, points) => {
    factors.push({ title, detail, points });
    score += points;
  };

  if (hasForeignConnection) {
    addFactor(
      "More than one legal system may matter",
      `${foreignLawContext.label}: ownership, marital-property treatment, formalities, taxes, inheritance, and enforcement may not follow the selected U.S. state's rules.`,
      4
    );
  }
  if (hasForeignConnection && !answers.foreignCountry.trim()) {
    addFactor("Exact foreign jurisdiction is unresolved", "Country-level analysis may still be too broad; a province, state, territory, emirate, or other local jurisdiction may control.", 2);
  }
  if (hasForeignConnection && (answers.foreignCountry.match(/,|;/g) || []).length > 0) {
    addFactor("Multiple foreign jurisdictions", "Each country—and sometimes each province, state, territory, or emirate—may require separate analysis and local counsel.", 2);
  }
  if (hasForeignConnection && answers.foreignAssetTypes.length > 0) {
    const sensitiveTypes = answers.foreignAssetTypes.filter((item) => /Real estate|Business|Trust|Pension/.test(item));
    addFactor(
      "Foreign asset classification and title",
      `${answers.foreignAssetTypes.join(", ")}. ${sensitiveTypes.length > 0 ? "One or more selected types commonly depends on local registries, mandatory rules, or specialist valuation." : "Account access, beneficial ownership, valuation, and currency conversion still need verification."}`,
      sensitiveTypes.length > 0 ? 3 : 2
    );
  }
  if (hasForeignConnection && !answers.foreignOwnership.trim()) {
    addFactor("Foreign title or beneficial ownership is not documented yet", "The agreement cannot classify or protect an asset reliably until counsel knows the registered owner, beneficial owner, source of funds, and any entity or trust rights.", 1);
  }
  if (hasForeignConnection && answers.foreignOwnership.trim()) {
    addFactor("Foreign ownership structure needs local verification", `Entered ownership context: ${answers.foreignOwnership.trim()}. Local records and beneficial ownership may not match informal descriptions.`, 1);
  }
  if (hasForeignConnection && (answers.futureMoveAbroad === "yes" || answers.futureMoveAbroad === "unsure")) {
    addFactor("Future residence may change the forum", "A later move can affect jurisdiction, domicile, tax residence, applicable law, and where an agreement must be enforced.", 2);
  }
  if (hasForeignConnection && (answers.foreignAgreementStatus === "yes" || answers.foreignAgreementStatus === "unsure")) {
    addFactor("Existing foreign documents may conflict", "A marriage contract, marital-regime election, trust, or local instrument must be coordinated rather than silently overwritten.", 2);
  }
  if (hasForeignConnection && (answers.foreignLanguageDocuments === "yes" || answers.foreignLanguageDocuments === "unsure")) {
    addFactor("Translation and informed-consent proof", "Certified translations, interpreters, and consistent bilingual schedules may be needed to support disclosure and understanding.", 1);
  }
  if (answers.citizenshipStatus === "one-us" || answers.citizenshipStatus === "neither-us") {
    addFactor("Citizenship, domicile, and immigration connections", "Nationality alone does not decide the case, but it can create additional jurisdiction, succession, tax, and recognition questions.", 2);
  }
  if (answers.coupleType === "same-sex" && (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure")) {
    addFactor("Marriage recognition must be confirmed abroad", "Some jurisdictions do not recognize the marriage, same-sex divorce, spousal rights, or the agreement in the same way.", 2);
  }
  if (answers.business === "yes") addFactor("Business ownership and future growth", "Control, valuation dates, retained earnings, compensation, buyout mechanics, and transfer restrictions need precise drafting.", 3);
  if (answers.realEstate === "yes") addFactor("Real-estate title and contributions", "Deeds, mortgages, down payments, improvements, appreciation, occupancy, sale, and buyout rights can pull in property-specific law.", 2);
  if (answers.currentAssets.length + answers.futureAssets.length >= 4) {
    addFactor("Many asset categories need separate rules", "Different assets can require different definitions, tracing methods, valuation dates, income treatment, and transfer procedures.", 2);
  }
  if (answers.incomeGap === "yes" || answers.careerSacrifice === "yes" || getIncomeSnapshot(answers).length > 0) {
    addFactor("Income, support, or career-sacrifice planning", "The agreement may need support rules, review triggers, housing protection, insurance, or compensation that remains fair over time.", 2);
  }
  if (answers.debts === "yes") addFactor("Debt and creditor exposure", "The agreement should classify existing and future obligations, but it generally cannot erase a creditor's rights against a signer or joint account holder.", 1);
  if (answers.children === "yes") addFactor("Family needs affect financial terms", "Housing, caregiving, and support planning can shape the financial agreement even though custody and child support cannot be conclusively set in advance.", 1);
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure" || answers.militaryStatus === "yes") {
    addFactor("Pension or federal-benefit rules", "Vesting, service credits, survivor elections, division orders, and non-waivable federal or plan rules require specialist review.", 2);
  }
  if (answers.mode === "postnup") addFactor("The agreement is being made after marriage", "Existing marital rights, fiduciary duties, transfers, and consideration can make process and enforceability more demanding.", 2);
  if (answers.pressure === "yes") addFactor("Timing or pressure threatens the process", "Rushed review can undermine voluntary consent and leave too little time for disclosure, independent counsel, and negotiation.", 3);
  if (answers.disclosureStarted === "no") addFactor("Financial disclosure has not started", "Incomplete schedules, missing values, and later-discovered assets can complicate negotiation and enforceability.", 2);

  if (factors.length === 0) {
    factors.push({
      title: "No major special complication selected yet",
      detail: "State formalities, complete disclosure, independent review, careful drafting, and enough time still matter in every agreement.",
      points: 0
    });
  }

  const level = score >= 9 ? "High" : score >= 4 ? "Moderate" : "Lower";
  return { score, level, factors };
}

function translateAsset(asset, language) {
  return assetTranslations[language]?.[asset] ?? asset;
}

function formatCurrency(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

function getAssetTotal(assetValues) {
  return Object.values(assetValues).reduce((total, value) => {
    const amount = Number(value);
    return Number.isFinite(amount) && amount > 0 ? total + amount : total;
  }, 0);
}

function getIncomeSnapshot(answers) {
  const currentIncome = formatCurrency(answers.currentAnnualIncome);
  const expectedIncome = formatCurrency(answers.expectedAnnualIncome);
  const growthDetails = answers.expectedIncomeGrowth.trim();
  const lines = [];

  if (currentIncome) lines.push(`Estimated current annual income: ${currentIncome}.`);
  if (expectedIncome) lines.push(`Estimated future annual income during the marriage: ${expectedIncome}.`);
  if (growthDetails) lines.push(`Expected income growth context: ${growthDetails}.`);
  if (lines.length > 0) {
    lines.push(
      "Income growth can matter because future earnings, lifestyle changes, business upside, support expectations, and community or marital-property claims may become disputed later."
    );
  }

  return lines;
}

function assetLabelWithValue(asset, assetValues) {
  const formatted = formatCurrency(assetValues[asset]);
  return formatted ? `${asset} (${formatted})` : asset;
}

function getRiskItems(answers, rule) {
  const risks = [];
  const currentAssets = answers.currentAssets.map((asset) => assetLabelWithValue(asset, answers.currentAssetValues));
  const futureAssets = answers.futureAssets.map((asset) => assetLabelWithValue(asset, answers.futureAssetValues));

  if (currentAssets.length > 0) {
    risks.push(
      `Current property and debt: ${currentAssets.join(", ")}. In divorce, these can become disputed if ownership, value, separate-property status, or responsibility for debt is unclear.`
    );
  }

  if (futureAssets.length > 0) {
    risks.push(
      `Future property: ${futureAssets.join(", ")}. These are often where conflict appears later because the value may grow, change form, or be mixed with marital funds.`
    );
  }

  if (answers.business === "yes") {
    risks.push("Business interests may be vulnerable to disputes over valuation, future growth, spouse contributions, and whether appreciation is separate or marital/community property.");
  }

  if (answers.realEstate === "yes") {
    risks.push("Real estate can be at risk when title, mortgage payments, renovations, appreciation, or use of joint funds make ownership less clean over time.");
  }

  if (answers.incomeGap === "yes" || answers.careerSacrifice === "yes") {
    risks.push("Income gaps or career sacrifices can make support terms, fairness, and bargaining power especially important to discuss before signing.");
  }

  if (getIncomeSnapshot(answers).length > 0) {
    risks.push("Expected income or income growth during marriage may be relevant to support, lifestyle expectations, and whether future earnings or appreciation should be addressed.");
  }

  if (answers.debts === "yes") {
    risks.push("Debt should be addressed directly so student loans, credit cards, business debt, or personal obligations are not accidentally treated as shared responsibility.");
  }

  if (answers.children === "yes") {
    risks.push("Children can affect financial planning, housing needs, support expectations, and what terms a court may refuse to enforce as against public policy.");
  }
  if (answers.militaryStatus === "yes") {
    risks.push("Military retirement, survivor coverage, disability benefits, and federal jurisdiction rules may limit or change what an agreement can accomplish.");
  }
  if (answers.governmentStatus === "yes") {
    risks.push("Government employment or public office may add pension, ethics, disclosure, conflict-of-interest, outside-income, or public-record considerations.");
  }
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure") {
    risks.push("A current or future pension can require careful treatment of vesting, service credits, marital accrual, valuation, survivor elections, and division orders.");
  }

  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    risks.push("International assets may be hard to value or enforce against without local advice in the country where the property is located.");
  }

  if (answers.pressure === "yes") {
    risks.push("The agreement itself may be at risk if someone feels pressured, rushed, or unable to review it with independent counsel.");
  }

  if (risks.length === 0) {
    risks.push(
      `No major asset category has been flagged yet, but ${rule.propertySystem.toLowerCase()} rules can still affect savings, income, property bought during marriage, and debt.`
    );
  }

  return risks;
}

const lossExposureDescriptions = {
  "Savings or investment accounts": "Some or all of the marital portion, growth, or commingled funds could become divisible or expensive to trace.",
  "Retirement accounts": "Contributions and growth during the marriage could be divided, potentially reducing long-term retirement savings.",
  "Real estate": "Equity, appreciation, mortgage contributions, or even control of the property could become disputed; a sale or buyout may be required.",
  "Business ownership": "Business value, appreciation, income, and control could face claims, valuation costs, or pressure for a buyout.",
  "Family gifts": "Family money could lose clean separate-property treatment if it is retitled, mixed, or used for shared expenses.",
  "Expected inheritance": "Inherited property may become harder to protect if it is commingled, jointly titled, or used for marital purposes.",
  "Student loans": "Responsibility for payments and the effect of debt on shared finances could become a point of dispute.",
  "Credit card or personal debt": "A court may have to allocate disputed balances, and shared accounts can leave both people exposed to creditors.",
  "Future inheritance": "Future inherited value could become disputed if the agreement does not set rules for tracing, growth, and commingling.",
  "Foreign inheritance": "Ownership and enforcement may be contested across jurisdictions, adding local counsel, translation, and tracing costs.",
  "Family business interest": "Family ownership, future growth, voting control, and buyout rights could be pulled into a divorce dispute.",
  "Future home purchase": "The down payment, title, equity, mortgage contributions, and right to remain in the home could all become contested.",
  "Appreciation of separate property": "Even if the original property stays separate, its growth could face marital or community-property claims.",
  "Income from separate property": "Income may be treated differently from the underlying asset and could become divisible or affect support claims."
};

function getLossExposureItems(answers, language) {
  const items = [...answers.currentAssets, ...answers.futureAssets].map((asset) => {
    const value = answers.currentAssetValues[asset] ?? answers.futureAssetValues[asset];
    const valueLabel = formatCurrency(value);
    return `${translateAsset(asset, language)}${valueLabel ? ` (${valueLabel})` : ""}: ${lossExposureDescriptions[asset]}`;
  });

  if (answers.business === "yes" && !answers.currentAssets.includes("Business ownership") && !answers.futureAssets.includes("Family business interest")) {
    items.push("Business interests: ownership, appreciation, income, valuation costs, or control could become disputed.");
  }
  if (answers.realEstate === "yes" && !answers.currentAssets.includes("Real estate") && !answers.futureAssets.includes("Future home purchase")) {
    items.push("Real estate: equity, appreciation, title, mortgage contributions, or the need for a sale or buyout could be disputed.");
  }
  if (answers.incomeGap === "yes" || answers.careerSacrifice === "yes") {
    items.push("Income and support: future earnings, lifestyle expectations, or compensation for career sacrifice could become part of a support dispute.");
  }
  if (answers.debts === "yes" && !answers.currentAssets.some((asset) => asset.includes("loan") || asset.includes("debt"))) {
    items.push("Debt responsibility: disputed loans, credit cards, or personal obligations could affect both parties' cash flow and credit.");
  }
  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    items.push("Foreign property: value, title, access, and enforcement could require proceedings or legal help in more than one country.");
  }

  if (items.length === 0) {
    items.push("Savings, earnings, property acquired during marriage, and debt may still be divided or allocated under state default rules.");
  }

  return items;
}

function getNextSteps(answers) {
  const steps = [
    "Make a complete list of assets, debts, expected inheritances, business interests, real estate, and estimated values.",
    "Discuss the goal of the agreement in plain language before exchanging draft terms.",
    "Ask a family-law attorney in the selected state what disclosures and process steps are needed."
  ];

  if (answers.mode === "prenup") {
    steps.push("Start early enough that both people have time to review, negotiate, and decide without wedding-pressure concerns.");
  } else {
    steps.push("Ask counsel how postnup review differs from prenup review because spouses may already owe fiduciary duties to each other.");
  }

  if (answers.counsel !== "yes") {
    steps.push("Consider separate counsel for each person, especially if there is a wealth gap, business, real estate, or family money involved.");
  }

  if (answers.disclosureStarted !== "yes") {
    steps.push("Gather account statements, property documents, loan balances, tax records, and business documents before relying on any draft.");
  }

  if (getIncomeSnapshot(answers).length > 0) {
    steps.push("Discuss how current income, future raises, equity, bonuses, business growth, or career changes should be treated during the marriage.");
  }

  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    steps.push("Identify which country controls each foreign asset and ask whether local counsel is needed there.");
  }

  return steps;
}

function roundToNearest(value, interval) {
  return Math.round(value / interval) * interval;
}

function formatCostRange(low, high, plus = false) {
  return `${formatCurrency(low)}-${formatCurrency(high)}${plus ? "+" : ""}`;
}

const stateAttorneyRateBenchmarks = {
  AL: 208,
  AK: 349,
  AZ: 266,
  AR: 242,
  CA: 344,
  CO: 261,
  CT: 342,
  DE: 344,
  FL: 297,
  GA: 286,
  HI: 339,
  ID: 233,
  IL: 305,
  IN: 242,
  IA: 202,
  KS: 227,
  KY: 204,
  LA: 245,
  ME: 193,
  MD: 310,
  MA: 285,
  MI: 266,
  MN: 271,
  MS: 217,
  MO: 249,
  MT: 199,
  NE: 218,
  NV: 311,
  NH: 248,
  NJ: 306,
  NM: 242,
  NY: 358,
  NC: 254,
  ND: 253,
  OH: 224,
  OK: 235,
  OR: 255,
  PA: 288,
  RI: 240,
  SC: 249,
  SD: 199,
  TN: 233,
  TX: 300,
  UT: 250,
  VT: 226,
  VA: 295,
  WA: 288,
  WV: 162,
  WI: 231,
  WY: 241
};

const attorneyRateSourceUrl = "https://www.lawpay.com/about/blog/lawyer-hourly-rate-by-state/";

function getStateCostAdjustment(stateCode) {
  const benchmarkRate = stateAttorneyRateBenchmarks[stateCode] ?? 257;
  const isClioSupplement = stateCode === "AK" || stateCode === "HI";
  const nationalComparisonRate = isClioSupplement ? 349 : 257;
  const multiplier = benchmarkRate / nationalComparisonRate;
  const benchmarkYear = isClioSupplement ? 2025 : 2023;
  const sourceUrl = isClioSupplement
    ? `https://www.clio.com/resources/legal-trends/compare-lawyer-rates/${stateCode.toLowerCase()}/`
    : attorneyRateSourceUrl;

  return {
    multiplier,
    benchmarkRate,
    benchmarkYear,
    sourceUrl,
    label: `${formatCurrency(benchmarkRate)}/hour statewide lawyer-rate benchmark (${benchmarkYear})`,
    note:
      stateCode === "AK"
        ? "Alaska's displayed rate is an illustrative midpoint of Clio's published practice-area range because a single statewide average was not available."
        : "The geography adjustment uses a published statewide all-practice lawyer-rate benchmark; it is not a family-law quote and city rates can differ substantially."
  };
}

function getCostEstimate(answers, result) {
  const factors = [];
  let tier = result.level;
  const stateCost = getStateCostAdjustment(answers.state);

  if (answers.business === "yes") factors.push("business ownership or expected business growth");
  if (answers.realEstate === "yes") factors.push("real estate");
  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") factors.push("foreign assets or enforcement questions");
  if (answers.futureAssets.length > 0) factors.push("future inheritances, gifts, appreciation, or expected assets");
  if (answers.incomeGap === "yes" || getIncomeSnapshot(answers).length > 0) factors.push("income gap or expected income growth");
  if (answers.mode === "postnup") factors.push("postnup review after marriage");
  if (answers.pressure === "yes") factors.push("timing or pressure concerns");
  if (answers.militaryStatus === "yes") factors.push("military retirement or survivor-benefit rules");
  if (answers.governmentStatus === "yes") factors.push("government employment or public-office rules");
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure") factors.push("pension valuation or survivor benefits");

  if (factors.length >= 4 || answers.internationalAssets === "yes") tier = "High";
  if (tier === "Lower" && factors.length >= 2) tier = "Moderate";

  const ranges = {
    Lower: {
      low: 1500,
      high: 3500,
      summary: "A simpler agreement with clear assets, modest negotiation, and fewer special issues may fall in this range."
    },
    Moderate: {
      low: 3500,
      high: 7500,
      summary: "A more customized agreement with meaningful assets, disclosure work, negotiation, or support terms often falls in this range."
    },
    High: {
      low: 7500,
      high: 15000,
      plus: true,
      summary: "Complex matters involving businesses, major real estate, foreign assets, high income, family wealth, or heavier negotiation can exceed this range."
    }
  };
  const range = ranges[tier];
  const adjustedLow = roundToNearest(range.low * stateCost.multiplier, 250);
  const adjustedHigh = roundToNearest(range.high * stateCost.multiplier, 250);

  return {
    tier,
    range: formatCostRange(adjustedLow, adjustedHigh, range.plus),
    summary: range.summary,
    stateCost,
    factors: factors.length > 0 ? factors : ["no major complexity factor selected yet"],
    note:
      "This is a rough private-attorney drafting and review estimate, not a quote. Actual cost depends on the city, lawyer, billing model, negotiation, disclosure quality, and whether each person hires separate counsel."
  };
}

function getDivorceLitigationEstimate(answers, currentAssetTotal, futureAssetTotal) {
  const stateCost = getStateCostAdjustment(answers.state);
  const enteredAssetValue = currentAssetTotal + futureAssetTotal;
  const assetTopicCount = answers.currentAssets.length + answers.futureAssets.length;
  const factors = [];
  let lowHours = 60;
  let highHours = 140;
  let expertLow = 0;
  let expertHigh = 0;

  const addHours = (label, low, high) => {
    factors.push(label);
    lowHours += low;
    highHours += high;
  };

  if (enteredAssetValue >= 5000000) addHours("$5M+ in entered current and future asset values", 50, 140);
  else if (enteredAssetValue >= 1000000) addHours("$1M+ in entered current and future asset values", 35, 90);
  else if (enteredAssetValue >= 250000) addHours("$250K+ in entered current and future asset values", 20, 50);
  else if (enteredAssetValue > 0) addHours("entered current or future asset values", 10, 25);

  if (assetTopicCount > 2) {
    const extraTopics = assetTopicCount - 2;
    addHours(`${assetTopicCount} separate asset or debt topics`, Math.min(30, extraTopics * 4), Math.min(80, extraTopics * 10));
  }
  if (answers.business === "yes") {
    addHours("business ownership, control, or valuation", 30, 90);
    expertLow += 7500;
    expertHigh += 30000;
  }
  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    addHours("foreign assets, tracing, or cross-border counsel", 40, 120);
    expertLow += 5000;
    expertHigh += 25000;
  }
  if (answers.realEstate === "yes") {
    addHours("real-estate title, equity, or tracing", 15, 45);
    expertLow += 1000;
    expertHigh += 5000;
  }
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure" || answers.militaryStatus === "yes") {
    addHours("pension or military-benefit valuation and division", 15, 45);
    expertLow += 1000;
    expertHigh += 6000;
  }
  if (answers.incomeGap === "yes" || answers.careerSacrifice === "yes" || getIncomeSnapshot(answers).length > 0) {
    addHours("income, support, or career-sacrifice disputes", 10, 30);
  }
  if (answers.debts === "yes") addHours("debt classification or allocation", 8, 20);
  if (answers.disclosureStarted === "no") addHours("financial disclosure has not started", 10, 30);
  if (enteredAssetValue >= 1000000 && answers.business !== "yes") {
    expertLow += 3000;
    expertHigh += 15000;
  }

  lowHours = Math.min(lowHours, 250);
  highHours = Math.min(highHours, 650);

  const attorneyLow = roundToNearest(lowHours * stateCost.benchmarkRate, 1000);
  const attorneyHigh = roundToNearest(highHours * stateCost.benchmarkRate, 1000);
  const roundedExpertLow = roundToNearest(expertLow, 1000);
  const roundedExpertHigh = roundToNearest(expertHigh, 1000);
  const totalLow = attorneyLow + roundedExpertLow;
  const totalHigh = attorneyHigh + roundedExpertHigh;

  return {
    range: formatCostRange(totalLow, totalHigh, highHours === 650),
    attorneyRange: formatCostRange(attorneyLow, attorneyHigh),
    expertRange: expertHigh > 0 ? formatCostRange(roundedExpertLow, roundedExpertHigh) : "$0 specifically added",
    hoursRange: `${lowHours}-${highHours} hours across both sides`,
    enteredAssetValue,
    factors: factors.length > 0 ? factors : ["baseline contested financial divorce"],
    stateCost
  };
}

function getConsequenceTimeline(answers) {
  const disclosureDetail = answers.disclosureStarted === "yes"
    ? "Existing financial disclosure may shorten this stage, but both sides can still request records, subpoenas, and sworn answers."
    : "Accounts, debts, tax returns, compensation, titles, and transfers may have to be reconstructed through formal discovery and subpoenas.";
  const valuationTopics = [];
  if (answers.business === "yes") valuationTopics.push("business valuation");
  if (answers.realEstate === "yes") valuationTopics.push("real-estate appraisal and tracing");
  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") valuationTopics.push("foreign records or local counsel");
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure" || answers.militaryStatus === "yes") valuationTopics.push("pension or military-benefit analysis");
  const valuationDetail = valuationTopics.length > 0
    ? `Selected issues may require ${valuationTopics.join(", ")}, followed by negotiation or mediation.`
    : "The parties may exchange valuations, trace separate property, calculate marital portions, and negotiate or mediate.";

  return [
    {
      range: "0-3 months",
      title: "Filing, response, and temporary rules",
      detail: "The court may address immediate use of property, payment of bills, access to accounts, temporary support, and orders against moving or hiding assets."
    },
    {
      range: "2-9 months",
      title: "Financial disclosure and discovery",
      detail: disclosureDetail
    },
    {
      range: "4-15+ months",
      title: "Tracing, valuation, and settlement work",
      detail: valuationDetail
    },
    {
      range: "12-24+ months",
      title: "Trial and final financial orders if issues remain",
      detail: "Witnesses and experts may testify, the court applies state law, and post-trial motions or appeals can extend the process. Many cases settle before this stage."
    }
  ];
}

function getConsequenceContext(answers, result, currentAssetTotal, futureAssetTotal) {
  const stressors = [];

  if (answers.mode === "postnup") stressors.push("planning after marriage has already started");
  if (answers.pressure === "yes") stressors.push("rushed or pressured signing process");
  if (answers.business === "yes") stressors.push("business ownership or future business growth");
  if (answers.realEstate === "yes") stressors.push("real estate, title, mortgage, or appreciation disputes");
  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") stressors.push("foreign assets or cross-border enforcement");
  if (answers.incomeGap === "yes") stressors.push("meaningful income or wealth gap");
  if (getIncomeSnapshot(answers).length > 0) stressors.push("expected income growth or changing lifestyle");
  if (answers.debts === "yes") stressors.push("debt responsibility");
  if (answers.children === "yes") stressors.push("children or family-planning financial needs");
  if (answers.careerSacrifice === "yes") stressors.push("career sacrifice or support expectations");
  if (answers.currentAssets.length > 0) stressors.push(`${answers.currentAssets.length} current asset/debt topic${answers.currentAssets.length === 1 ? "" : "s"}`);
  if (answers.futureAssets.length > 0) stressors.push(`${answers.futureAssets.length} future asset topic${answers.futureAssets.length === 1 ? "" : "s"}`);
  if (currentAssetTotal > 0 || futureAssetTotal > 0) {
    const total = currentAssetTotal + futureAssetTotal;
    stressors.push(`${formatCurrency(total)} in entered asset-value estimates`);
  }

  const exposureScore = result.score + Math.min(5, stressors.length);
  const exposure = exposureScore >= 11 ? "High" : exposureScore >= 6 ? "Moderate" : "Lower";

  return { stressors, exposure };
}

function getDivorceRateContext(answers, consequenceContext) {
  const hasComparableStateRate = !statesWithoutComparableCdcDivorceRate.has(answers.state);
  const stateRate = hasComparableStateRate ? stateDivorceBenchmarks[answers.state] : null;
  const stateComparisonPct = stateRate === null ? null : Math.round(((stateRate - nationalDivorceBenchmark) / nationalDivorceBenchmark) * 100);
  const signals = [];
  const notScored = [];
  let indicatorScore = 50;

  const addSignal = (label, points) => {
    signals.push({ label, points });
    indicatorScore += points;
  };

  if (stateComparisonPct !== null) {
    const statePoints = Math.max(-10, Math.min(10, Math.round(stateComparisonPct / 6)));
    if (statePoints !== 0) addSignal("Selected-state rate compared with the national reported-jurisdiction rate", statePoints);
  }
  if (answers.pressure === "yes") addSignal("Rush or pressure was reported", 10);
  if (answers.discussedWithPartner === "no") addSignal("The topic has not yet been discussed", 6);
  if (answers.discussedWithPartner === "yes") addSignal("The topic has already been discussed", -4);
  if (answers.disclosureStarted === "no") addSignal("Financial disclosure has not started", 5);
  if (answers.disclosureStarted === "yes") addSignal("Financial disclosure has started", -3);
  if (answers.counsel === "no") addSignal("Neither person has spoken with counsel yet", 3);
  if (answers.counsel === "yes") addSignal("At least one person has spoken with counsel", -2);
  if (answers.debts === "yes") addSignal("Debt obligations were selected", 5);
  if (answers.incomeGap === "yes") addSignal("A meaningful income or wealth gap was selected", 4);
  if (answers.careerSacrifice === "yes") addSignal("Career sacrifice or support expectations were selected", 3);
  if (answers.internationalAssets === "yes") addSignal("Foreign assets or cross-border enforcement were selected", 4);
  if (answers.internationalAssets === "unsure") addSignal("Foreign-asset status is uncertain", 2);
  if (answers.business === "yes") addSignal("Business ownership or future growth was selected", 2);
  if (answers.realEstate === "yes") addSignal("Real-estate ownership was selected", 2);

  if (answers.coupleType) notScored.push("Couple type was not scored because the app does not have a directly comparable official rate for this individual couple.");
  if (answers.citizenshipStatus) notScored.push("Citizenship was not scored; citizenship alone is not treated as a divorce predictor.");
  if (answers.children === "yes") notScored.push("Children were not scored because the intake does not capture the family structure, timing, or cohort data needed for a meaningful comparison.");
  if (answers.militaryStatus === "yes") notScored.push("Military status was not scored because service branch, component, deployment, age, and cohort data are not directly comparable with the CDC state rate.");
  if (answers.governmentStatus === "yes") notScored.push("Government employment or public office was not scored because it is a legal-planning factor, not a supported divorce-rate adjustment.");
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure") notScored.push("Pension status was not scored because it affects financial complexity, not a defensible personal divorce probability.");

  indicatorScore = Math.max(15, Math.min(85, indicatorScore));
  const band = indicatorScore >= 65 ? "Elevated" : indicatorScore >= 45 ? "Mixed" : "Lower";

  return {
    nationalRate: nationalDivorceBenchmark,
    stateRate,
    stateComparisonPct,
    hasComparableStateRate,
    indicatorScore,
    band,
    signals,
    notScored,
    sourceUrl: divorceStatisticsSource,
    stressors: consequenceContext.stressors
  };
}

function getConsequenceStory(answers, rule, context, costEstimate, litigationEstimate) {
  const agreementName = answers.mode === "prenup" ? "prenup" : "postnup";
  const assetPhrase = answers.currentAssets.length
    ? `The first argument starts with ${answers.currentAssets.slice(0, 3).join(", ").toLowerCase()}, then escalates until a perfectly normal bank statement is being treated like evidence from a submarine trial`
    : "The first argument starts with a checking account, a vague memory of who paid for what, and one spreadsheet named FINAL-final-use-this-one.xlsx that everyone swears is the real one this time";
  const futurePhrase = answers.futureAssets.length
    ? `Then someone remembers the ${answers.futureAssets.slice(0, 2).join(" and ").toLowerCase()} that was supposed to be simple. It immediately grows a mustache, hires a valuation expert, and becomes three separate arguments.`
    : "Then the conversation finds future money anyway, because future money has excellent timing and terrible manners.";
  const internationalPhrase =
    answers.internationalAssets === "yes" || answers.internationalAssets === "unsure"
      ? `A foreign-asset issue appears, and suddenly the divorce has an international subplot in ${answers.foreignCountry || "another country"}, complete with time zones, stamps, and one document nobody can find.`
      : "At least there is no foreign-asset subplot. Small mercy, though the paperwork still brought tap shoes.";
  const incomePhrase =
    answers.incomeGap === "yes" || getIncomeSnapshot(answers).length > 0
      ? "Income growth becomes a courtroom weather system: bonuses raining sideways, equity fog, and everyone arguing about who packed the umbrella."
      : "Income is less dramatic here, which is good. The paperwork still finds a way to enter wearing a cape.";

  return [
    `Imagine nobody signs a ${agreementName}. Years later, the relationship ends, and ${rule.name}'s default ${rule.propertySystem.toLowerCase()} rules burst through the wall holding a clipboard and a tiny gavel.`,
    `${assetPhrase}. ${futurePhrase}`,
    `${internationalPhrase} ${incomePhrase}`,
    `Instead of calmly pointing to a signed agreement, everyone pays lawyers to reconstruct intent from old emails, bank transfers, half-remembered conversations, and screenshots that somehow all have 3% battery and the emotional tone of a hostage note.`,
    `The estimated attorney-cost range for drafting now is ${costEstimate.range}. The rough combined cost of litigating the financial divorce later is ${litigationEstimate.range}. The haunted cash register has, regrettably, learned arithmetic.`,
    `Dispute exposure based on the current answers: ${context.exposure}. Translation: the ${agreementName} conversation may be awkward now, but future-you may send present-you a fruit basket and a notarized thank-you card.`
  ];
}

function getForeignLawContext(countryInput) {
  const country = countryInput.trim();
  if (!country) {
    return {
      label: "Foreign jurisdiction not specified",
      overview: "The relevant country—and often the province, state, territory, or emirate—must be identified before anyone can meaningfully analyze the asset.",
      agreementTreatment: "A US prenup or postnup may be evidence of the couple's intent, but it may not be recognized or enforced on the same terms abroad.",
      propertyRules: "Real estate is commonly affected by the law where it is located. Bank accounts, businesses, inheritances, and marital-property rights may follow different conflict-of-law rules.",
      formalities: "Some jurisdictions require a notary, public deed, witnesses, registration, certified translation, apostille, or independent local advice.",
      watchItems: ["Exact country and subnational jurisdiction", "Asset type, title holder, and acquisition date", "Residence and nationality of each spouse", "Inheritance, tax, currency, and enforcement rules"],
      questions: ["Which country's law would a local court apply to this asset?", "Would the US agreement be recognized, or is a local agreement or filing needed?", "What signing, translation, notarization, registration, or disclosure rules apply?"],
      sources: []
    };
  }

  const normalized = country.toLowerCase();
  const matches = [
    {
      terms: ["scotland"],
      label: "Scotland",
      overview: "Scotland has its own family-law system and should not be analyzed as though it were England and Wales.",
      agreementTreatment: "Agreements on financial provision can carry substantial contractual weight, but a Scottish court may set aside or vary an agreement that was not fair and reasonable when made.",
      propertyRules: "The Family Law (Scotland) Act 1985 governs financial provision on divorce. Asset classification, valuation dates, source of funds, and whether property is matrimonial property can be decisive.",
      formalities: "Use Scottish drafting and independent advice, with full financial disclosure and enough time to avoid pressure. A US choice-of-law clause does not by itself guarantee the result in Scotland.",
      watchItems: ["Whether either spouse is domiciled or habitually resident in Scotland", "Whether Scottish real estate or business interests are matrimonial property", "Fairness at the date of signing", "Interaction with aliment, succession, and pension rights"],
      questions: ["Could a Scottish court set aside or vary these terms under the 1985 Act?", "Should the couple sign a Scottish-law agreement or schedule?", "How should Scottish land, pensions, or business interests be valued and documented?"],
      sources: [{ label: "Family Law (Scotland) Act 1985", url: "https://www.legislation.gov.uk/ukpga/1985/37/contents" }]
    },
    {
      terms: ["canada"],
      label: "Canada",
      overview: "Canada does not have one nationwide marital-property code. Property division and domestic-contract rules are primarily provincial or territorial.",
      agreementTreatment: "Marriage contracts and similar domestic agreements are recognized under provincial law, but disclosure, voluntariness, independent advice, support waivers, and court review differ by province.",
      propertyRules: "The province or territory may control division of family property, while the federal Divorce Act addresses divorce, support, and parenting. Real estate location and the spouses' residence can point to different laws.",
      formalities: "Written signatures and witnessing are common, but local requirements vary. Full disclosure and separate Canadian advice are especially important if the agreement waives property or support rights.",
      watchItems: ["Province or territory connected to each asset", "Matrimonial-home rules, which may receive special treatment", "Pension division and beneficiary designations", "Inheritance, gifts, excluded property, and growth in value"],
      questions: ["Which province's domestic-contract law applies?", "Can property or spousal-support rights be waived in that province?", "Does a matrimonial home, pension, or inheritance require special language or a separate filing?"],
      sources: [{ label: "Justice Canada — Dividing Property", url: "https://www.justice.gc.ca/eng/fl-df/divorce/prop.html" }]
    },
    {
      terms: ["england", "wales", "united kingdom", "uk", "northern ireland"],
      label: "England and Wales / United Kingdom",
      overview: "The United Kingdom contains separate legal systems. This summary addresses England and Wales; Scotland and Northern Ireland require their own review.",
      agreementTreatment: "In England and Wales, a nuptial agreement is not automatically binding like an ordinary commercial contract. Courts retain statutory discretion, but may give decisive weight to an agreement freely entered with full appreciation of its implications unless enforcement would be unfair.",
      propertyRules: "Courts can make broad financial orders under the Matrimonial Causes Act 1973, including orders affecting property and maintenance. Needs—especially housing and children—can outweigh the agreement.",
      formalities: "Independent advice, material financial disclosure, clear drafting, and signing well before the wedding strengthen weight. Foreign-law wording alone does not remove the English court's discretion.",
      watchItems: ["Whether England and Wales could hear the divorce", "Needs of either spouse and children", "Foreign real estate and practical enforcement abroad", "Pensions, trusts, inherited wealth, and non-marital property"],
      questions: ["Would this agreement receive weight under Radmacher in England and Wales?", "Do needs or child-related terms make any clause vulnerable?", "Should an English-law mirror agreement be signed?"],
      sources: [
        { label: "UK Supreme Court — Radmacher v Granatino", url: "https://www.supremecourt.uk/cases/uksc-2009-0031" },
        { label: "Matrimonial Causes Act 1973", url: "https://www.legislation.gov.uk/ukpga/1973/18" }
      ]
    },
    {
      terms: ["mexico"],
      label: "Mexico",
      overview: "Mexican family and civil law is state-specific, so the Mexican state tied to the marriage or asset matters.",
      agreementTreatment: "Mexican capitulaciones matrimoniales can establish or regulate sociedad conyugal or separación de bienes. A US prenup may not substitute for locally compliant capitulaciones.",
      propertyRules: "The elected marital regime, state civil code, deed, and land registry can determine ownership. Ejido or restricted-zone interests, trusts, businesses, and inheritances need asset-specific review.",
      formalities: "A public deed may be required when the arrangement transfers or shares property for which that form is legally required. Registration or annotation may also be needed to affect third parties.",
      watchItems: ["Mexican state and marital regime", "Deed and Public Registry status", "Restricted-zone trust or ejido issues", "Whether a transfer triggers tax, notarial, or registration consequences"],
      questions: ["Do we need Mexican capitulaciones or a notarial deed in addition to the US agreement?", "Which state civil code governs?", "Will the agreement affect title or third parties without local registration?"],
      sources: [{ label: "Mexico Federal Civil Code — Articles 178–185", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf" }]
    },
    {
      terms: ["india"],
      label: "India",
      overview: "India does not offer one uniform US-style prenup regime. The governing marriage, divorce, maintenance, and succession rules can depend on personal law, religion, and the statute under which the marriage is registered.",
      agreementTreatment: "A premarital agreement may be considered as a contract or evidence of intent, but it should not be presented as automatically controlling statutory maintenance, divorce, or public-policy rights.",
      propertyRules: "Title, source of funds, joint ownership, gifts at marriage, maintenance statutes, and religion-specific succession law can matter more than US marital-property labels.",
      formalities: "Indian counsel should check contract validity, stamp or registration issues, notarization, and whether a local document would improve evidentiary value. Terms contrary to personal law or public policy may not be enforced.",
      watchItems: ["Marriage statute and each spouse's applicable personal law", "Title and source of purchase funds", "Maintenance and residence rights that may not be waivable", "Inheritance, gifts, family property, and foreign-exchange rules"],
      questions: ["Which personal and statutory laws apply to this couple?", "Would an Indian court treat the US agreement as enforceable, persuasive, or only evidentiary?", "Should any property declaration be stamped, registered, or separately documented in India?"],
      sources: [{ label: "India Code — Hindu Marriage Act 1955", url: "https://www.indiacode.nic.in/handle/123456789/16839?view_type=browse" }]
    },
    {
      terms: ["hong kong"],
      label: "Hong Kong",
      overview: "Hong Kong has a legal system separate from mainland China, so its property and matrimonial rules require a separate analysis.",
      agreementTreatment: "Nuptial agreements may be influential but do not automatically eliminate the Hong Kong court's statutory power to order financial provision. Fairness, disclosure, advice, timing, and needs remain important.",
      propertyRules: "The Matrimonial Proceedings and Property Ordinance gives courts powers over financial relief. Local title, pensions, company interests, trusts, and cross-border assets may require separate enforcement steps.",
      formalities: "Use Hong Kong advice, full disclosure, clear governing-law language, and enough time for independent review. Mainland Chinese documentation does not automatically solve Hong Kong issues, or vice versa.",
      watchItems: ["Hong Kong jurisdiction over a future divorce", "Housing and child-related needs", "Companies, trusts, and beneficial ownership", "Recognition and enforcement in mainland China or another country"],
      questions: ["How much weight would a Hong Kong court give this US agreement?", "Should the parties sign a Hong Kong-law agreement?", "How would an order or agreement be enforced against assets outside Hong Kong?"],
      sources: [{ label: "Hong Kong Cap. 192 — Matrimonial Proceedings and Property Ordinance", url: "https://www.elegislation.gov.hk/hk/cap192" }]
    },
    {
      terms: ["china", "prc", "mainland"],
      label: "Mainland China",
      overview: "Mainland China should be analyzed separately from Hong Kong, Macau, and Taiwan.",
      agreementTreatment: "Article 1065 of the PRC Civil Code permits spouses to agree in writing that premarital or marital property will be separately owned, jointly owned, or partly each. A US agreement still needs local review for recognition and scope.",
      propertyRules: "Title registration is critical for real estate and companies. Separate-property status, marital income, debts, inheritance, and gifts are addressed by the Civil Code, while transfer and foreign-exchange rules can affect practical control.",
      formalities: "The property agreement must be written. Chinese-language drafting, notarization or authentication, registration changes, and proof that third parties knew of a debt arrangement may matter depending on the issue.",
      watchItems: ["Registered owner and source of purchase funds", "Company equity and nominee ownership", "Foreign-exchange and outbound-transfer restrictions", "Inheritance, gifts, and cross-border enforcement"],
      questions: ["Does Article 1065 cover each proposed term?", "Is a Chinese-language property agreement, notarization, or registry filing advisable?", "Can the agreement affect creditors or third parties without notice?"],
      sources: [{ label: "PRC Civil Code Article 1065 overview", url: "https://en.by.gov.cn/2024-02/18/c_963399.htm" }]
    },
    {
      terms: ["france"],
      label: "France",
      overview: "France uses formal marital-property regimes rather than treating a US prenup as a drop-in replacement for a French contrat de mariage.",
      agreementTreatment: "Couples may select a marital regime by contrat de mariage. Without one, the French legal regime generally applies, commonly communauté réduite aux acquêts for marriages governed by French law.",
      propertyRules: "The chosen regime affects acquisitions and debts. French real estate, succession, reserved-heirship rights, lifetime gifts, and estate planning require separate analysis.",
      formalities: "A French contrat de mariage is executed through a notaire before marriage; later changes follow additional procedures. A US agreement may need a coordinated French instrument rather than translation alone.",
      watchItems: ["Applicable marital regime and date of marriage", "French real estate and notarial title", "Reserved-heirship and succession planning", "EU/private-international-law choice-of-law rules"],
      questions: ["Which marital regime currently applies?", "Is a French notarial contract or later regime change needed?", "How do succession and reserved-heirship rules interact with the agreement?"],
      sources: [{ label: "French Civil Code Article 1394", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006439143" }]
    },
    {
      terms: ["italy"],
      label: "Italy",
      overview: "Italian law uses a statutory marital-property regime and formal convenzioni matrimoniali, so local classification matters.",
      agreementTreatment: "The default regime is generally comunione legale for qualifying acquisitions during marriage. Spouses may choose or modify a different regime, including separation of property, through a locally valid marital convention.",
      propertyRules: "Italian real estate records, business interests, gifts, inheritances, and succession rules remain locally governed. Not every US-style divorce term will fit an Italian marital convention.",
      formalities: "A different marital-property convention generally requires an atto pubblico before a notary and appropriate annotation or publicity to affect third parties.",
      watchItems: ["Current Italian marital regime", "Annotation on the marriage record and land records", "Italian real estate or family-company interests", "Forced-heirship and succession consequences"],
      questions: ["Is the couple currently in comunione legale or separazione dei beni?", "Is an Italian public deed or annotation required?", "Which US provisions would not be recognized as part of an Italian marital convention?"],
      sources: [{ label: "Italian Ministry of Justice — Marital Property Regime", url: "https://www.giustizia.it/giustizia/page/it/coppie_di_nazionalita_diverse_regime_patrimoniale" }]
    },
    {
      terms: ["germany"],
      label: "Germany",
      overview: "Germany's default regime is Zugewinngemeinschaft: spouses generally keep separate ownership during marriage, with accrued gains potentially equalized when the regime ends.",
      agreementTreatment: "Spouses may modify or replace the statutory regime by Ehevertrag, before or after marriage. German courts can still scrutinize extreme terms under mandatory-law and fairness principles.",
      propertyRules: "Initial assets, final assets, inheritances, gifts, business valuations, pensions, and real estate can affect equalization or other claims even when title is separate.",
      formalities: "A German Ehevertrag must be recorded by a notary while both parties are present. A privately signed US agreement may not satisfy that German form requirement.",
      watchItems: ["Initial and final asset documentation", "Business valuation and retained earnings", "German pensions and real estate", "Inheritance/gift adjustments and choice-of-law issues"],
      questions: ["Is a German notarized Ehevertrag required?", "How would Zugewinnausgleich apply to the listed assets?", "Could any support, pension, or divorce waiver fail German mandatory-law review?"],
      sources: [
        { label: "German Civil Code § 1363", url: "https://www.gesetze-im-internet.de/bgb/__1363.html" },
        { label: "German Civil Code §§ 1408 and 1410", url: "https://www.gesetze-im-internet.de/bgb/__1410.html" }
      ]
    },
    {
      terms: ["uae", "united arab emirates", "dubai", "abu dhabi"],
      label: "United Arab Emirates",
      overview: "The UAE analysis can change with the emirate, each spouse's nationality and religion, whether the marriage is civil or religious, and which personal-status system applies.",
      agreementTreatment: "A US prenup should not be assumed to control a UAE court. Non-Muslim civil-marriage regimes and Muslim personal-status rules may treat contractual terms, maintenance, inheritance, and divorce differently.",
      propertyRules: "Registered title is important for UAE real estate and companies. Personal-status choice-of-law rules, free-zone structures, wills, inheritance, and the forum hearing the dispute can change the outcome.",
      formalities: "Local Arabic translation, notarization, legalization, court or notarial registration, and an emirate-specific document may be required or advisable.",
      watchItems: ["Emirate, religion, nationality, and marriage type", "Mainland vs. free-zone company interests", "Real-estate title and mortgage", "UAE wills, inheritance, and guardianship planning"],
      questions: ["Which UAE personal-status regime and court would apply?", "Can the agreement be registered or mirrored locally?", "Are Arabic translation, notarization, legalization, or a UAE will needed?"],
      sources: [{ label: "Official UAE Government — Divorce in the UAE", url: "https://u.ae/en/information-and-services/social-affairs/divorce-in-the-uae" }]
    },
    {
      terms: ["australia"],
      label: "Australia",
      overview: "Australia uses statutory financial agreements under the Family Law Act rather than simply importing a US prenup or postnup.",
      agreementTreatment: "Financial agreements may be made before, during, or after marriage under sections 90B, 90C, and 90D. Binding status depends on statutory requirements, and courts may set agreements aside on listed grounds.",
      propertyRules: "Without a binding financial agreement, Australian courts apply the Family Law Act to property and maintenance. Australian real estate, superannuation, trusts, companies, and foreign assets may all be considered.",
      formalities: "The agreement must be signed and each party must receive independent legal advice about its effect and advantages/disadvantages, with the required lawyer statements and copies handled correctly.",
      watchItems: ["Strict compliance with Part VIIIA", "Superannuation splitting requirements", "Fraud, non-disclosure, impracticability, unconscionability, or changed child-related circumstances", "Australian jurisdiction and foreign enforcement"],
      questions: ["Should the parties sign an Australian section 90B or 90C agreement?", "Does each spouse's independent advice satisfy section 90G?", "Could any statutory set-aside ground apply?"],
      sources: [{ label: "Australia Family Law Act 1975 — Part VIIIA", url: "https://www.legislation.gov.au/C2004A00275/latest" }]
    }
  ];

  const normalizedWords = normalized.split(/[^a-z]+/).filter(Boolean);
  const match = matches.find((item) =>
    item.terms.some((term) => (term.length <= 3 ? normalizedWords.includes(term) : normalized.includes(term)))
  );
  if (match) return match;

  return {
    label: country,
    overview: `${country} is not yet in the app's researched jurisdiction set, so the app should not guess at its substantive law.`,
    agreementTreatment: `Confirm whether ${country} recognizes foreign premarital or marital agreements, what issues spouses may contract about, and what standards allow a court to disregard terms.`,
    propertyRules: `Identify how ${country} classifies real estate, business interests, accounts, inheritances, gifts, debts, and property acquired during marriage.`,
    formalities: "Check writing, witnesses, disclosure, independent advice, notarial form, translation, legalization, registration, and governing-law requirements.",
    watchItems: ["Exact local jurisdiction and court", "Asset type, title, source of funds, and acquisition date", "Residence, domicile, nationality, and marriage type", "Tax, inheritance, currency, and enforcement rules"],
    questions: [`Would a court in ${country} recognize and enforce the US agreement?`, `Is a local agreement, deed, filing, translation, or registration needed in ${country}?`, "Which mandatory rights cannot be waived?"],
    sources: []
  };
}

function addPdfSection(doc, title, lines, cursor) {
  const pageHeight = doc.internal.pageSize.getHeight();
  const normalizedLines = Array.isArray(lines) ? lines : [lines];
  let y = cursor;

  if (y > pageHeight - 38) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(28, 37, 34);
  doc.text(title, 18, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(63, 75, 70);

  normalizedLines.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, 172);
    if (y + wrapped.length * 5 > pageHeight - 18) {
      doc.addPage();
      y = 20;
    }
    doc.text(wrapped, 22, y);
    y += wrapped.length * 5 + 3;
  });

  return y + 4;
}

async function generateReportPdf({
  answers,
  copy,
  rule,
  result,
  currentAssetTotal,
  futureAssetTotal,
  riskItems,
  nextSteps,
  costEstimate,
  incomeSnapshot,
  foreignLawContext,
  coupleForeignChecks,
  lossExposureItems,
  lossExposureValue,
  localLawyerLinks,
  whyImportantItems,
  materialsChecklist,
  attorneyDiscussionTopics,
  publicBenefitsSummary
}) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const generatedAt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const pathLabel = answers.mode === "prenup" ? "Prenup readiness" : "Postnup readiness";
  const scoreLabel = `${result.level} planning value`;

  doc.setFillColor(47, 52, 55);
  doc.rect(0, 0, 216, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(copy.brandTitle, 18, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`${pathLabel} | ${rule.name} | Generated ${generatedAt}`, 18, 29);

  doc.setFillColor(216, 210, 200);
  doc.roundedRect(162, 12, 36, 18, 2, 2, "F");
  doc.setTextColor(42, 45, 47);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(String(result.score), 171, 24);
  doc.setFontSize(8);
  doc.text(scoreLabel, 18, 49);

  let y = 60;
  y = addPdfSection(
    doc,
    answers.mode === "postnup" ? copy.whyPostnupImportant : copy.whyImportant,
    whyImportantItems,
    y
  );

  y = addPdfSection(doc, copy.mostAtRisk, riskItems, y);

  const lossExposureLines = [copy.lossExposureIntro, ...lossExposureItems];
  if (lossExposureValue > 0) {
    lossExposureLines.push(`${copy.lossExposureValueLabel}: ${formatCurrency(lossExposureValue)}. ${copy.lossExposureValueNote}`);
  }
  lossExposureLines.push(copy.lossExposureDisclaimer);
  y = addPdfSection(doc, copy.lossExposureTitle, lossExposureLines, y);

  y = addPdfSection(doc, copy.recommendedNextSteps, nextSteps, y);

  y = addPdfSection(doc, copy.estimatedCost, [
    `Estimated range: ${costEstimate.range}.`,
    `${copy.stateAdjustment} ${rule.name} uses a ${costEstimate.stateCost.label}.`,
    costEstimate.summary,
    `${copy.costDriverLabel} ${costEstimate.factors.join(", ")}.`,
    costEstimate.stateCost.note,
    `${copy.costSourceLabel}: ${costEstimate.stateCost.sourceUrl}`,
    costEstimate.note
  ], y);

  if (incomeSnapshot.length > 0) {
    y = addPdfSection(doc, copy.incomeAndGrowth, incomeSnapshot, y);
  }

  y = addPdfSection(doc, copy.stateContext, [
    answers.mode === "prenup" ? rule.prenupContext : rule.postnupContext,
    rule.timing,
    rule.futureAssets,
    rule.international
  ], y);

  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    const foreignLawLines = [
      `${foreignLawContext.label}: ${foreignLawContext.overview}`,
      `${copy.foreignAgreementTreatment}: ${foreignLawContext.agreementTreatment}`,
      `${copy.foreignPropertyRules}: ${foreignLawContext.propertyRules}`,
      `${copy.foreignFormalities}: ${foreignLawContext.formalities}`,
      `${copy.foreignWatchItems}: ${foreignLawContext.watchItems.join("; ")}.`,
      `${copy.foreignQuestions}: ${foreignLawContext.questions.join("; ")}.`
    ];
    if (coupleForeignChecks.length > 0) {
      foreignLawLines.push(`${copy.foreignCoupleChecks}: ${coupleForeignChecks.join("; ")}.`);
    }
    if (foreignLawContext.sources.length > 0) {
      foreignLawLines.push(
        `${copy.foreignSources}: ${foreignLawContext.sources.map((source) => `${source.label} — ${source.url}`).join("; ")}.`
      );
    }
    foreignLawLines.push(copy.foreignDisclaimer);
    y = addPdfSection(doc, copy.foreignLawNote, foreignLawLines, y);
  }

  if (currentAssetTotal > 0 || futureAssetTotal > 0) {
    const assetLines = [];
    if (currentAssetTotal > 0) assetLines.push(`Estimated current asset/debt topics total: ${formatCurrency(currentAssetTotal)}.`);
    if (futureAssetTotal > 0) assetLines.push(`Estimated future asset topics total: ${formatCurrency(futureAssetTotal)}.`);
    assetLines.push(copy.assetEstimateNote);
    y = addPdfSection(doc, copy.assetSnapshot, assetLines, y);
  }

  if (publicBenefitsSummary.length > 0) {
    y = addPdfSection(doc, copy.publicBenefitsTitle, publicBenefitsSummary, y);
  }

  y = addPdfSection(doc, copy.attorneyTopics, attorneyDiscussionTopics, y);

  y = addPdfSection(doc, copy.materialsTitle, [
    copy.materialsIntro,
    ...materialsChecklist,
    copy.materialsPrivacyNote
  ], y);

  y = addPdfSection(doc, copy.localLawyersTitle, [
    `${copy.localLawyersIntro} ${localLawyerLinks.location}.`,
    ...localLawyerLinks.links.map((link) => `${copy[link.labelKey]}: ${link.url}`),
    copy.localLawyersDisclaimer
  ], y);

  y = addPdfSection(doc, copy.sourceNotes, rule.sourceNotes, y);

  addPdfSection(
    doc,
    "Educational Use Note",
    "This report is for educational planning and issue spotting only. It does not draft an agreement, provide legal advice, or replace legal counsel.",
    y
  );

  doc.save(`prenup-planner-${answers.state.toLowerCase()}-report.pdf`);
}

function scoreAnswers(answers) {
  let score = 0;
  const reasons = [];

  if (answers.mode === "postnup") {
    score += 2;
    reasons.push("Postnup planning usually deserves extra process attention because the parties are already married or partnered.");
  }

  const months = Number(answers.weddingMonths);
  if (answers.mode === "prenup" && answers.weddingMonths !== "") {
    if (months < 2) {
      score += 3;
      reasons.push("The wedding timeline is short, which can make voluntariness and review time especially important.");
    } else if (months < 6) {
      score += 1;
      reasons.push("The wedding is approaching soon enough that early document gathering and counsel conversations matter.");
    }
  }

  if (answers.futureAssets.length > 0) {
    score += Math.min(3, answers.futureAssets.length);
    reasons.push("Future gifts, inheritances, appreciation, or business growth should be handled expressly instead of assumed.");
  }

  if (answers.internationalAssets === "yes") {
    score += 3;
    reasons.push("International assets can involve foreign ownership, inheritance, tax, and enforcement questions.");
  }

  ["business", "realEstate", "incomeGap", "careerSacrifice", "debts", "children"].forEach((key) => {
    if (answers[key] === "yes") score += 1;
  });

  if (answers.militaryStatus === "yes") {
    score += 1;
    reasons.push("Military retirement, survivor, disability, and federal benefit rules can add specialized planning issues.");
  }
  if (answers.governmentStatus === "yes") {
    score += 1;
    reasons.push("Government employment or public office can add pension, ethics, disclosure, or conflict-of-interest considerations.");
  }
  if (answers.pensionStatus === "yes" || answers.pensionStatus === "unsure") {
    score += 1;
    reasons.push("A current or expected pension should be addressed before vesting, service credits, survivor benefits, or valuation become disputed.");
  }

  if (answers.pressure === "yes") {
    score += 2;
    reasons.push("Any pressure or rushed process should be discussed with counsel before relying on an agreement.");
  }

  const level = score >= 8 ? "High" : score >= 4 ? "Moderate" : "Lower";
  return { score, level, reasons };
}

function FieldGroup({ title, children }) {
  return (
    <section className="field-group">
      <h2>{title}</h2>
      <div className="field-stack">{children}</div>
    </section>
  );
}

function ChoiceButton({ active, children, onClick }) {
  return (
    <button className={active ? "choice active" : "choice"} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function YesNo({ copy, value, onChange }) {
  return (
    <div className="segmented" role="group">
      <button className={value === "yes" ? "active" : ""} type="button" onClick={() => onChange("yes")}>
        {copy.yes}
      </button>
      <button className={value === "no" ? "active" : ""} type="button" onClick={() => onChange("no")}>
        {copy.no}
      </button>
      <button className={value === "unsure" ? "active" : ""} type="button" onClick={() => onChange("unsure")}>
        {copy.unsure}
      </button>
    </div>
  );
}

function DivorceCartoon({ exposure }) {
  return (
    <div className={`cartoon-panel ${exposure.toLowerCase()}`} aria-hidden="true">
      <svg viewBox="0 0 520 280" role="img">
        <rect className="cartoon-bg" x="8" y="8" width="504" height="264" rx="18" />
        <path className="cartoon-floor" d="M28 224 H492" />

        <g className="cartoon-person">
          <path className="cartoon-body" d="M66 220 C70 180 93 161 128 161 C163 161 187 181 194 220 Z" />
          <circle className="cartoon-head" cx="128" cy="112" r="52" />
          <path className="cartoon-hair" d="M82 111 C73 65 105 48 139 57 C176 66 183 94 171 116 C161 91 145 82 113 84 C99 84 91 94 82 111 Z" />
          <path className="cartoon-eye" d="M99 112 Q109 102 119 112 M138 112 Q148 102 158 112" />
          <ellipse className="cartoon-mouth" cx="129" cy="139" rx="15" ry="12" />
          <path className="cartoon-tear-stream" d="M108 116 C108 131 101 139 103 154 M149 116 C149 132 157 140 154 156" />
          <path className="cartoon-tear-drop" d="M101 156 C93 167 96 175 103 175 C111 175 113 166 101 156 Z M155 158 C146 170 150 178 157 177 C165 176 166 168 155 158 Z" />
          <path className="cartoon-arm" d="M82 179 C53 172 44 153 35 141 M174 181 C201 174 207 151 216 141" />
          <circle className="cartoon-hand" cx="33" cy="138" r="9" />
          <circle className="cartoon-hand" cx="218" cy="138" r="9" />
        </g>

        <g className="cartoon-wallet" transform="rotate(-9 58 193)">
          <rect x="31" y="178" width="54" height="35" rx="7" />
          <path d="M55 178 V213" />
          <circle cx="61" cy="195" r="3" />
        </g>

        <g className="cartoon-speech">
          <rect x="220" y="28" width="272" height="94" rx="18" />
          <path d="M240 116 L211 143 L256 120 Z" />
          <text x="356" y="67" textAnchor="middle">WHERE’D ALL MY</text>
          <text x="356" y="100" textAnchor="middle">MONEY GO?!</text>
        </g>

        <g className="cartoon-flying-paper" transform="rotate(11 306 159)">
          <rect x="269" y="137" width="74" height="48" rx="5" />
          <text x="306" y="157" textAnchor="middle">LEGAL</text>
          <text x="306" y="176" textAnchor="middle">FEES</text>
        </g>
        <g className="cartoon-flying-money" transform="rotate(-12 403 171)">
          <rect x="369" y="151" width="68" height="40" rx="6" />
          <text x="403" y="180" textAnchor="middle">$</text>
        </g>
        <path className="cartoon-motion" d="M252 167 Q236 158 229 147 M351 192 Q341 204 323 207 M448 139 Q465 134 475 121" />

        <text className="cartoon-caption" x="260" y="250" textAnchor="middle">
          NO AGREEMENT: A FINANCIAL MYSTERY IN SIX BILLABLE HOURS.
        </text>
      </svg>
    </div>
  );
}

function App() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [language, setLanguage] = useState("en");
  const [stepIndex, setStepIndex] = useState(0);
  const [scriptCopied, setScriptCopied] = useState(false);
  const copy = getCopy(language);
  const rule = stateRules[answers.state];
  const result = useMemo(() => scoreAnswers(answers), [answers]);
  const currentAssetTotal = useMemo(() => getAssetTotal(answers.currentAssetValues), [answers.currentAssetValues]);
  const futureAssetTotal = useMemo(() => getAssetTotal(answers.futureAssetValues), [answers.futureAssetValues]);
  const incomeSnapshot = useMemo(() => getIncomeSnapshot(answers), [answers]);
  const riskItems = useMemo(() => getRiskItems(answers, rule), [answers, rule]);
  const whyImportantItems = useMemo(
    () => getWhyImportantItems(answers, copy, language, rule),
    [answers, copy, language, rule]
  );
  const lossExposureItems = useMemo(() => getLossExposureItems(answers, language), [answers, language]);
  const lossExposureValue = currentAssetTotal + futureAssetTotal;
  const nextSteps = useMemo(() => getNextSteps(answers), [answers]);
  const costEstimate = useMemo(() => getCostEstimate(answers, result), [answers, result]);
  const consequenceContext = useMemo(
    () => getConsequenceContext(answers, result, currentAssetTotal, futureAssetTotal),
    [answers, result, currentAssetTotal, futureAssetTotal]
  );
  const divorceRateContext = useMemo(
    () => getDivorceRateContext(answers, consequenceContext),
    [answers, consequenceContext]
  );
  const divorceLitigationEstimate = useMemo(
    () => getDivorceLitigationEstimate(answers, currentAssetTotal, futureAssetTotal),
    [answers, currentAssetTotal, futureAssetTotal]
  );
  const consequenceTimeline = useMemo(() => getConsequenceTimeline(answers), [answers]);
  const consequenceStory = useMemo(
    () => getConsequenceStory(answers, rule, consequenceContext, costEstimate, divorceLitigationEstimate),
    [answers, rule, consequenceContext, costEstimate, divorceLitigationEstimate]
  );
  const conversationScript = useMemo(() => getConversationScript(answers, copy, language), [answers, copy, language]);
  const coupleForeignChecks = useMemo(() => getCoupleSpecificForeignChecks(answers), [answers]);
  const foreignLawContext = useMemo(() => getForeignLawContext(answers.foreignCountry), [answers.foreignCountry]);
  const complexityAnalysis = useMemo(
    () => getAgreementComplexityAnalysis(answers, foreignLawContext),
    [answers, foreignLawContext]
  );
  const localLawyerLinks = useMemo(() => getLocalLawyerLinks(answers, rule), [answers.locality, rule]);
  const materialsChecklist = useMemo(() => getMaterialsChecklist(answers, copy), [answers, copy]);
  const attorneyDiscussionTopics = useMemo(() => getAttorneyDiscussionTopics(answers, copy), [answers, copy]);
  const publicBenefitsSummary = useMemo(() => getPublicBenefitsSummary(answers, copy), [answers, copy]);

  const setAnswer = (key, value) => setAnswers((current) => ({ ...current, [key]: value }));
  const toggleListAnswer = (key, value) =>
    setAnswers((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value]
    }));
  const toggleAsset = (groupKey, valueKey, asset) => {
    setAnswers((current) => {
      const isSelected = current[groupKey].includes(asset);
      const nextValues = { ...current[valueKey] };
      if (isSelected) delete nextValues[asset];
      return {
        ...current,
        [groupKey]: isSelected ? current[groupKey].filter((item) => item !== asset) : [...current[groupKey], asset],
        [valueKey]: nextValues
      };
    });
  };
  const setAssetValue = (groupKey, asset, value) =>
    setAnswers((current) => ({
      ...current,
      [groupKey]: {
        ...current[groupKey],
        [asset]: value
      }
    }));
  const copyConversationScript = async () => {
    try {
      await navigator.clipboard.writeText(conversationScript.join("\n\n"));
      setScriptCopied(true);
      window.setTimeout(() => setScriptCopied(false), 1800);
    } catch {
      setScriptCopied(false);
    }
  };
  const step = steps[stepIndex];

  return (
    <main className="app-shell" dir={languages[language].dir} lang={language}>
      <aside className="sidebar">
        <div className="brand">
          <Scale size={28} aria-hidden="true" />
          <div>
            <p>{copy.brandTitle}</p>
            <span>{copy.brandSubtitle}</span>
          </div>
        </div>

        <nav className="step-list" aria-label="Planner sections">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const label = getStepLabel(copy, item.id, answers.mode);
            return (
              <button
                className={index === stepIndex ? "step active" : "step"}
                key={item.id}
                type="button"
                onClick={() => setStepIndex(index)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="boundary-note">
          <ShieldCheck size={18} aria-hidden="true" />
          <p>{copy.boundaryNote}</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>{getStepLabel(copy, step.id, answers.mode)}</h1>
          </div>
          <div className="topbar-actions">
            <label className="language-select">
              <span>{copy.languageLabel}</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                {Object.entries(languages).map(([code, item]) => (
                  <option value={code} key={code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <div className={`score-pill ${result.level.toLowerCase()}`}>
              <Sparkles size={16} aria-hidden="true" />
              {result.level} {copy.planningValue}
            </div>
          </div>
        </header>

        <div className="panel">
          {step.id === "path" && (
            <FieldGroup title={copy.pathTitle}>
              <div className="choice-grid two">
                <ChoiceButton active={answers.mode === "prenup"} onClick={() => setAnswer("mode", "prenup")}>
                  <BadgeCheck size={22} aria-hidden="true" />
                  <strong>{copy.prenupReadiness}</strong>
                  <span>{copy.prenupReadinessText}</span>
                </ChoiceButton>
                <ChoiceButton active={answers.mode === "postnup"} onClick={() => setAnswer("mode", "postnup")}>
                  <HeartHandshake size={22} aria-hidden="true" />
                  <strong>{copy.postnupReadiness}</strong>
                  <span>{copy.postnupReadinessText}</span>
                </ChoiceButton>
              </div>

              <section className="couple-profile-card">
                <h3>{copy.coupleProfileTitle}</h3>
                <div>
                  <p className="label-text">{copy.coupleTypeQuestion}</p>
                  <div className="chip-grid">
                    {[
                      ["different-sex", copy.coupleTypeDifferent],
                      ["same-sex", copy.coupleTypeSame],
                      ["another", copy.coupleTypeAnother],
                      ["prefer-not", copy.preferNotToSay]
                    ].map(([value, label]) => (
                      <button
                        className={answers.coupleType === value ? "chip selected" : "chip"}
                        key={value}
                        type="button"
                        onClick={() => setAnswer("coupleType", value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="label-text">{copy.citizenshipQuestion}</p>
                  <div className="chip-grid">
                    {[
                      ["both-us", copy.citizenshipBoth],
                      ["one-us", copy.citizenshipOne],
                      ["neither-us", copy.citizenshipNeither],
                      ["prefer-not", copy.preferNotToSay]
                    ].map(([value, label]) => (
                      <button
                        className={answers.citizenshipStatus === value ? "chip selected" : "chip"}
                        key={value}
                        type="button"
                        onClick={() => setAnswer("citizenshipStatus", value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {(answers.citizenshipStatus === "one-us" || answers.citizenshipStatus === "neither-us") && (
                  <label>
                    {copy.citizenshipCountriesQuestion}
                    <input
                      type="text"
                      value={answers.citizenshipCountries}
                      onChange={(event) => setAnswer("citizenshipCountries", event.target.value)}
                      placeholder={copy.citizenshipCountriesPlaceholder}
                    />
                  </label>
                )}
                <div>
                  <p className="label-text">{copy.militaryQuestion}</p>
                  <YesNo copy={copy} value={answers.militaryStatus} onChange={(value) => setAnswer("militaryStatus", value)} />
                </div>
                <div>
                  <p className="label-text">{copy.governmentQuestion}</p>
                  <YesNo copy={copy} value={answers.governmentStatus} onChange={(value) => setAnswer("governmentStatus", value)} />
                </div>
                <div>
                  <p className="label-text">{copy.pensionQuestion}</p>
                  <YesNo copy={copy} value={answers.pensionStatus} onChange={(value) => setAnswer("pensionStatus", value)} />
                </div>
                {(answers.militaryStatus === "yes" || answers.governmentStatus === "yes" || answers.pensionStatus === "yes") && (
                  <label>
                    {copy.publicBenefitsDetailsQuestion}
                    <input
                      type="text"
                      value={answers.publicBenefitsDetails}
                      onChange={(event) => setAnswer("publicBenefitsDetails", event.target.value)}
                      placeholder={copy.publicBenefitsDetailsPlaceholder}
                    />
                  </label>
                )}
              </section>

              <label>
                {copy.marriageLicenseState}
                <select value={answers.state} onChange={(event) => setAnswer("state", event.target.value)}>
                  {Object.entries(stateRules).map(([code, state]) => (
                    <option value={code} key={code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                {copy.localityQuestion}
                <input
                  type="text"
                  value={answers.locality}
                  onChange={(event) => setAnswer("locality", event.target.value)}
                  placeholder={copy.localityPlaceholder}
                />
              </label>

              <div className="state-summary">
                <Scale size={20} aria-hidden="true" />
                <div>
                  <strong>{rule.propertySystem}</strong>
                  <p>{answers.mode === "prenup" ? rule.prenupContext : rule.postnupContext}</p>
                </div>
              </div>
            </FieldGroup>
          )}

          {step.id === "timing" && (
            <FieldGroup title={answers.mode === "prenup" ? copy.timingPrenup : copy.timingPostnup}>
              {answers.mode === "prenup" && (
                <label>
                  {copy.weddingMonths}
                  <input
                    min="0"
                    type="number"
                    value={answers.weddingMonths}
                    onChange={(event) => setAnswer("weddingMonths", event.target.value)}
                    placeholder="Example: 8"
                  />
                </label>
              )}

              <label>
                {copy.topicDiscussed}
                <YesNo copy={copy} value={answers.discussedWithPartner} onChange={(value) => setAnswer("discussedWithPartner", value)} />
              </label>

              <label>
                {copy.counsel}
                <YesNo copy={copy} value={answers.counsel} onChange={(value) => setAnswer("counsel", value)} />
              </label>

              <label>
                {copy.disclosureStarted}
                <YesNo copy={copy} value={answers.disclosureStarted} onChange={(value) => setAnswer("disclosureStarted", value)} />
              </label>

              <label>
                {copy.pressure}
                <YesNo copy={copy} value={answers.pressure} onChange={(value) => setAnswer("pressure", value)} />
              </label>

              <section className="conversation-starter">
                <div className="conversation-heading">
                  <div>
                    <p className="conversation-eyebrow">{copy.conversationEyebrow}</p>
                    <h3>{copy.conversationTitle}</h3>
                  </div>
                  <button className="copy-script-button" type="button" onClick={copyConversationScript}>
                    {scriptCopied ? <CheckCircle2 size={17} aria-hidden="true" /> : <CopyIcon size={17} aria-hidden="true" />}
                    {scriptCopied ? copy.copiedScript : copy.copyScript}
                  </button>
                </div>
                <p className="conversation-intro">{copy.conversationIntro}</p>
                <blockquote className="conversation-script">
                  {conversationScript.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </blockquote>
                <div className="conversation-tips">
                  <strong>{copy.conversationTipsTitle}</strong>
                  <ul>
                    {copy.conversationTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </FieldGroup>
          )}

          {step.id === "assets" && (
            <FieldGroup title={copy.assetsTitle}>
              <div>
                <p className="label-text">{copy.currentTopics}</p>
                <div className="chip-grid">
                  {assetOptions.map((asset) => (
                    <button
                      className={answers.currentAssets.includes(asset) ? "chip selected" : "chip"}
                      key={asset}
                      type="button"
                      onClick={() => toggleAsset("currentAssets", "currentAssetValues", asset)}
                    >
                      {translateAsset(asset, language)}
                    </button>
                  ))}
                </div>
              </div>

              {answers.currentAssets.length > 0 && (
                <div className="asset-value-list">
                  <p className="label-text">{copy.estimatedCurrentValues}</p>
                  {answers.currentAssets.map((asset) => (
                    <label className="asset-value-row" key={asset}>
                      <span>{translateAsset(asset, language)}</span>
                      <input
                        min="0"
                        inputMode="numeric"
                        type="number"
                        value={answers.currentAssetValues[asset] ?? ""}
                        onChange={(event) => setAssetValue("currentAssetValues", asset, event.target.value)}
                        placeholder="Estimated USD"
                      />
                    </label>
                  ))}
                  {currentAssetTotal > 0 && <p className="asset-total">{copy.currentTotal} {formatCurrency(currentAssetTotal)}</p>}
                </div>
              )}

              <div>
                <p className="label-text">{copy.futureTopics}</p>
                <div className="chip-grid">
                  {futureAssetOptions.map((asset) => (
                    <button
                      className={answers.futureAssets.includes(asset) ? "chip selected" : "chip"}
                      key={asset}
                      type="button"
                      onClick={() => toggleAsset("futureAssets", "futureAssetValues", asset)}
                    >
                      {translateAsset(asset, language)}
                    </button>
                  ))}
                </div>
              </div>

              {answers.futureAssets.length > 0 && (
                <div className="asset-value-list">
                  <p className="label-text">{copy.estimatedFutureValues}</p>
                  {answers.futureAssets.map((asset) => (
                    <label className="asset-value-row" key={asset}>
                      <span>{translateAsset(asset, language)}</span>
                      <input
                        min="0"
                        inputMode="numeric"
                        type="number"
                        value={answers.futureAssetValues[asset] ?? ""}
                        onChange={(event) => setAssetValue("futureAssetValues", asset, event.target.value)}
                        placeholder="Estimated USD"
                      />
                    </label>
                  ))}
                  {futureAssetTotal > 0 && <p className="asset-total">{copy.futureTotal} {formatCurrency(futureAssetTotal)}</p>}
                </div>
              )}

              <div className="state-summary">
                <Landmark size={20} aria-hidden="true" />
                <p>{rule.futureAssets}</p>
              </div>
            </FieldGroup>
          )}

          {step.id === "complexity" && (
            <FieldGroup title={copy.complexityTitle}>
              <p className="field-group-intro">{copy.complexityIntro}</p>
              <label>
                {copy.internationalQuestion}
                <YesNo copy={copy} value={answers.internationalAssets} onChange={(value) => setAnswer("internationalAssets", value)} />
              </label>

              {(answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") && (
                <section className="foreign-intake">
                  <div className="foreign-intake-grid">
                    <label>
                      {copy.foreignCountry}
                      <input
                        type="text"
                        value={answers.foreignCountry}
                        onChange={(event) => setAnswer("foreignCountry", event.target.value)}
                        placeholder="Example: Ontario, France, India, Dubai"
                      />
                    </label>
                    <label>
                      {copy.foreignResidenceQuestion}
                      <input
                        type="text"
                        value={answers.foreignResidence}
                        onChange={(event) => setAnswer("foreignResidence", event.target.value)}
                        placeholder={copy.foreignResidencePlaceholder}
                      />
                    </label>
                  </div>

                  <div>
                    <p className="label-text">{copy.foreignAssetTypesTitle}</p>
                    <div className="chip-grid foreign-asset-chips">
                      {foreignAssetTypeOptions.map((assetType) => (
                        <button
                          className={answers.foreignAssetTypes.includes(assetType) ? "chip selected" : "chip"}
                          key={assetType}
                          type="button"
                          onClick={() => toggleListAnswer("foreignAssetTypes", assetType)}
                        >
                          {assetType}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label>
                    {copy.foreignOwnershipQuestion}
                    <input
                      type="text"
                      value={answers.foreignOwnership}
                      onChange={(event) => setAnswer("foreignOwnership", event.target.value)}
                      placeholder={copy.foreignOwnershipPlaceholder}
                    />
                  </label>

                  <div className="foreign-yes-no-grid">
                    <label>
                      {copy.futureMoveQuestion}
                      <YesNo copy={copy} value={answers.futureMoveAbroad} onChange={(value) => setAnswer("futureMoveAbroad", value)} />
                    </label>
                    <label>
                      {copy.foreignAgreementQuestion}
                      <YesNo copy={copy} value={answers.foreignAgreementStatus} onChange={(value) => setAnswer("foreignAgreementStatus", value)} />
                    </label>
                    <label>
                      {copy.foreignLanguageQuestion}
                      <YesNo copy={copy} value={answers.foreignLanguageDocuments} onChange={(value) => setAnswer("foreignLanguageDocuments", value)} />
                    </label>
                  </div>

                  <div className="foreign-implications-preview">
                    <div className="foreign-preview-heading">
                      <Globe2 size={21} aria-hidden="true" />
                      <div>
                        <h3>{copy.foreignImplicationsTitle}</h3>
                        <p>{copy.foreignImplicationsIntro}</p>
                      </div>
                    </div>
                    <p><strong>{foreignLawContext.label}:</strong> {foreignLawContext.overview}</p>
                    <div className="foreign-preview-grid">
                      <section>
                        <h4>{copy.foreignAgreementTreatment}</h4>
                        <p>{foreignLawContext.agreementTreatment}</p>
                      </section>
                      <section>
                        <h4>{copy.foreignPropertyRules}</h4>
                        <p>{foreignLawContext.propertyRules}</p>
                      </section>
                      <section>
                        <h4>{copy.foreignFormalities}</h4>
                        <p>{foreignLawContext.formalities}</p>
                      </section>
                      <section>
                        <h4>{copy.foreignWatchItems}</h4>
                        <ul>{foreignLawContext.watchItems.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                      <section>
                        <h4>{copy.foreignQuestions}</h4>
                        <ul>{foreignLawContext.questions.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                      {foreignLawContext.sources.length > 0 && (
                        <section>
                          <h4>{copy.foreignSources}</h4>
                          <ul>
                            {foreignLawContext.sources.map((source) => (
                              <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>
                    {coupleForeignChecks.length > 0 && (
                      <div className="foreign-couple-details">
                        <h4>{copy.foreignProfileDetails}</h4>
                        <ul>{coupleForeignChecks.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              <label>
                {copy.incomeGap}
                <YesNo copy={copy} value={answers.incomeGap} onChange={(value) => setAnswer("incomeGap", value)} />
              </label>

              <div className="asset-value-list">
                <p className="label-text">{copy.incomeGrowthTitle}</p>
                <div className="income-grid">
                  <label>
                    {copy.currentIncome}
                    <input
                      min="0"
                      inputMode="numeric"
                      type="number"
                      value={answers.currentAnnualIncome}
                      onChange={(event) => setAnswer("currentAnnualIncome", event.target.value)}
                      placeholder="Example: 95000"
                    />
                  </label>
                  <label>
                    {copy.expectedIncome}
                    <input
                      min="0"
                      inputMode="numeric"
                      type="number"
                      value={answers.expectedAnnualIncome}
                      onChange={(event) => setAnswer("expectedAnnualIncome", event.target.value)}
                      placeholder="Example: 160000"
                    />
                  </label>
                </div>
                <label>
                  {copy.incomeGrowthContext}
                  <input
                    type="text"
                    value={answers.expectedIncomeGrowth}
                    onChange={(event) => setAnswer("expectedIncomeGrowth", event.target.value)}
                    placeholder="Example: medical residency, law firm track, startup equity, family business"
                  />
                </label>
              </div>

              <label>
                {copy.business}
                <YesNo copy={copy} value={answers.business} onChange={(value) => setAnswer("business", value)} />
              </label>

              <label>
                {copy.realEstate}
                <YesNo copy={copy} value={answers.realEstate} onChange={(value) => setAnswer("realEstate", value)} />
              </label>

              <label>
                {copy.combinedFactors}
                <div className="mini-grid">
                  <span>{copy.debt}</span>
                  <YesNo copy={copy} value={answers.debts} onChange={(value) => setAnswer("debts", value)} />
                  <span>{copy.children}</span>
                  <YesNo copy={copy} value={answers.children} onChange={(value) => setAnswer("children", value)} />
                  <span>{copy.careerSacrifice}</span>
                  <YesNo copy={copy} value={answers.careerSacrifice} onChange={(value) => setAnswer("careerSacrifice", value)} />
                </div>
              </label>

              <div className="state-summary">
                <Globe2 size={20} aria-hidden="true" />
                <p>{rule.international}</p>
              </div>

              <section className="complexity-analysis">
                <div className="complexity-analysis-heading">
                  <div>
                    <h3>{copy.complexityAnalysisTitle}</h3>
                    <p>{copy.complexityAnalysisIntro}</p>
                  </div>
                  <div className={`complexity-level ${complexityAnalysis.level.toLowerCase()}`}>
                    <span>{complexityAnalysis.score}</span>
                    <strong>{copy[`complexity${complexityAnalysis.level}`]}</strong>
                  </div>
                </div>
                <div className="complexity-factor-list">
                  {complexityAnalysis.factors.map((factor) => (
                    <article key={`${factor.title}-${factor.detail}`}>
                      <div>
                        <h4>{factor.title}</h4>
                        <p>{factor.detail}</p>
                      </div>
                      {factor.points > 0 && <strong>+{factor.points}</strong>}
                    </article>
                  ))}
                </div>
              </section>
            </FieldGroup>
          )}

          {step.id === "consequences" && (
            <section className="consequences">
              <div className="consequence-hero">
                <div>
                  <p className="eyebrow">{copy.storyEyebrow}</p>
                  <h2>{copy.consequencesTitle}</h2>
                  <p>{copy.statisticsDisclaimer}</p>
                </div>
                <div className={`exposure-meter ${consequenceContext.exposure.toLowerCase()}`}>
                  <AlertTriangle size={20} aria-hidden="true" />
                  <span>{copy.estimatedDisputeExposure}</span>
                  <strong>{copy[`exposure${consequenceContext.exposure}`]}</strong>
                </div>
              </div>

              <div className="consequence-grid">
                <article className="story-card">
                  <DivorceCartoon exposure={consequenceContext.exposure} />
                  <h3>{copy.storyTitle}</h3>
                  {consequenceStory.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p className="story-note">{copy.storyRefreshNote}</p>
                </article>

                <article className="stats-card">
                  <div className="stats-title">
                    <BarChart3 size={20} aria-hidden="true" />
                    <h3>{copy.statisticsTitle}</h3>
                  </div>
                  <div className="stat-grid">
                    <div className="stat-row">
                      <span>{divorceRateContext.nationalRate.toFixed(1)}</span>
                      <p>
                        {copy.nationalBenchmark}: {copy.rateNote}.
                      </p>
                    </div>
                    <div className="stat-row">
                      <span>{divorceRateContext.stateRate === null ? "N/A" : divorceRateContext.stateRate.toFixed(1)}</span>
                      <p>
                        {rule.name} {copy.stateBenchmark}: {divorceRateContext.stateRate === null ? copy.stateDataUnavailable : copy.rateNote}.
                      </p>
                    </div>
                    <div className="stat-row">
                      <span>
                        {divorceRateContext.stateComparisonPct === null
                          ? "—"
                          : `${divorceRateContext.stateComparisonPct > 0 ? "+" : ""}${divorceRateContext.stateComparisonPct}%`}
                      </span>
                      <p>{copy.stateComparison}</p>
                    </div>
                  </div>

                  <div className={`context-index ${divorceRateContext.band.toLowerCase()}`}>
                    <div className="context-index-heading">
                      <span>{copy.unofficialIndexTitle}</span>
                      <strong>{divorceRateContext.indicatorScore}<small> / 100</small></strong>
                    </div>
                    <div className="context-index-track" aria-hidden="true">
                      <span style={{ width: `${divorceRateContext.indicatorScore}%` }} />
                    </div>
                    <p><strong>{copy[`contextBand${divorceRateContext.band}`]}</strong> · {copy.unofficialIndexExplanation}</p>
                  </div>

                  <p>{copy.baselineRate}</p>
                  <p>{copy.complexityImpact}</p>

                  <h3>{copy.signalBreakdown}</h3>
                  {divorceRateContext.signals.length > 0 ? (
                    <ul className="signal-list">
                      {divorceRateContext.signals.map((signal) => (
                        <li key={signal.label}>
                          <span>{signal.label}</span>
                          <strong className={signal.points > 0 ? "up" : "down"}>
                            {signal.points > 0 ? "+" : ""}{signal.points}
                          </strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{copy.noIndicatorSignals}</p>
                  )}

                  {divorceRateContext.notScored.length > 0 && (
                    <div className="not-scored">
                      <h3>{copy.notScoredTitle}</h3>
                      <p>{copy.notScoredIntro}</p>
                      <ul>
                        {divorceRateContext.notScored.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  <a className="statistics-source" href={divorceRateContext.sourceUrl} target="_blank" rel="noreferrer">
                    {copy.divorceSourceLabel} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </article>
              </div>

              <article className="litigation-cost-card">
                <div className="litigation-cost-header">
                  <div>
                    <p className="eyebrow">{copy.litigationCostEyebrow}</p>
                    <h3>{copy.litigationCostTitle}</h3>
                    <p>{copy.litigationCostIntro}</p>
                  </div>
                  <strong className="litigation-cost-range">{divorceLitigationEstimate.range}</strong>
                </div>

                <div className="litigation-cost-grid">
                  <div>
                    <span>{copy.litigationAttorneyFees}</span>
                    <strong>{divorceLitigationEstimate.attorneyRange}</strong>
                  </div>
                  <div>
                    <span>{copy.litigationExpertFees}</span>
                    <strong>{divorceLitigationEstimate.expertRange}</strong>
                  </div>
                  <div>
                    <span>{copy.litigationHours}</span>
                    <strong>{divorceLitigationEstimate.hoursRange}</strong>
                  </div>
                  <div>
                    <span>{copy.litigationAssetBasis}</span>
                    <strong>
                      {divorceLitigationEstimate.enteredAssetValue > 0
                        ? formatCurrency(divorceLitigationEstimate.enteredAssetValue)
                        : "No values entered"}
                    </strong>
                  </div>
                </div>

                <div className="litigation-cost-details">
                  <div>
                    <h4>{copy.litigationFactors}</h4>
                    <ul>
                      {divorceLitigationEstimate.factors.map((factor) => <li key={factor}>{factor}</li>)}
                    </ul>
                  </div>
                  <div className="litigation-method">
                    <p>
                      <strong>{rule.name}:</strong> {divorceLitigationEstimate.stateCost.label}. The estimate multiplies that benchmark by the displayed combined attorney-time range, then adds only the selected valuation/expert allowances.
                    </p>
                    <a href={divorceLitigationEstimate.stateCost.sourceUrl} target="_blank" rel="noreferrer">
                      {copy.litigationRateSource} <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <p className="litigation-disclaimer">{copy.litigationDisclaimer}</p>
              </article>

              <div className="consequence-detail-grid">
                <article className="consequence-detail-card exposure-detail-card">
                  <div className="consequence-detail-heading">
                    <CircleDollarSign size={21} aria-hidden="true" />
                    <h3>{copy.consequenceExposureTitle}</h3>
                  </div>
                  <p>{copy.consequenceExposureIntro}</p>
                  {lossExposureValue > 0 && (
                    <div className="consequence-exposure-value">
                      <span>{copy.consequenceExposureValue}</span>
                      <strong>{formatCurrency(lossExposureValue)}</strong>
                    </div>
                  )}
                  <ul>
                    {lossExposureItems.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>

                <article className="consequence-detail-card timeline-card">
                  <div className="consequence-detail-heading">
                    <Clock3 size={21} aria-hidden="true" />
                    <h3>{copy.consequenceTimelineTitle}</h3>
                  </div>
                  <p>{copy.consequenceTimelineIntro}</p>
                  <ol className="consequence-timeline">
                    {consequenceTimeline.map((stage) => (
                      <li key={stage.title}>
                        <span>{stage.range}</span>
                        <div>
                          <h4>{stage.title}</h4>
                          <p>{stage.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              </div>

              <article className="agreement-boundary-card">
                <div className="consequence-detail-heading">
                  <ShieldCheck size={21} aria-hidden="true" />
                  <h3>{copy.agreementBoundaryTitle}</h3>
                </div>
                <div className="agreement-boundary-grid">
                  <section>
                    <h4>{copy.agreementMayHelp}</h4>
                    <ul>{copy.agreementMayHelpItems.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                  <section>
                    <h4>{copy.agreementCannotControl}</h4>
                    <ul>{copy.agreementCannotControlItems.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                </div>
              </article>
            </section>
          )}

          {step.id === "report" && (
            <section className="report">
              <div className="report-header">
                <div>
                  <p className="eyebrow">{copy.planningReport}</p>
                  <h2>{result.level} {copy.valueInDiscussing}</h2>
                </div>
                <div className="report-actions">
                  <button
                    className="download-button"
                    type="button"
                    onClick={() =>
                      generateReportPdf({
                        answers,
                        copy,
                        rule,
                        result,
                        currentAssetTotal,
                        futureAssetTotal,
                        riskItems,
                        nextSteps,
                        costEstimate,
                        incomeSnapshot,
                        foreignLawContext,
                        coupleForeignChecks,
                        lossExposureItems,
                        lossExposureValue,
                        localLawyerLinks,
                        whyImportantItems,
                        materialsChecklist,
                        attorneyDiscussionTopics,
                        publicBenefitsSummary
                      })
                    }
                  >
                    <FileText size={17} aria-hidden="true" />
                    {copy.downloadPdf}
                  </button>
                  <div className={`score-badge ${result.level.toLowerCase()}`}>{result.score}</div>
                </div>
              </div>

              <div className="report-grid">
                <article className="why-important-card">
                  <div className="why-important-heading">
                    <ShieldCheck size={22} aria-hidden="true" />
                    <h3>{answers.mode === "postnup" ? copy.whyPostnupImportant : copy.whyImportant}</h3>
                  </div>
                  <ul>
                    {whyImportantItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="loss-exposure-card">
                  <div className="loss-exposure-heading">
                    <AlertTriangle size={22} aria-hidden="true" />
                    <h3>{copy.lossExposureTitle}</h3>
                  </div>
                  <p>{copy.lossExposureIntro}</p>
                  {lossExposureValue > 0 && (
                    <div className="loss-exposure-value">
                      <span>{copy.lossExposureValueLabel}</span>
                      <strong>{formatCurrency(lossExposureValue)}</strong>
                      <small>{copy.lossExposureValueNote}</small>
                    </div>
                  )}
                  <ul>
                    {lossExposureItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="loss-exposure-disclaimer">{copy.lossExposureDisclaimer}</p>
                </article>

                <article>
                  <h3>{copy.mostAtRisk}</h3>
                  <ul>
                    {riskItems.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>{copy.stateContext}</h3>
                  <p>{answers.mode === "prenup" ? rule.prenupContext : rule.postnupContext}</p>
                  <p>{rule.timing}</p>
                </article>

                {(answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") && (
                  <article className="foreign-law-card">
                    <h3>{copy.foreignLawNote}</h3>
                    <p>
                      <strong>{foreignLawContext.label}: </strong>
                      {foreignLawContext.overview}
                    </p>
                    <div className="foreign-law-grid">
                      <section>
                        <h4>{copy.foreignAgreementTreatment}</h4>
                        <p>{foreignLawContext.agreementTreatment}</p>
                      </section>
                      <section>
                        <h4>{copy.foreignPropertyRules}</h4>
                        <p>{foreignLawContext.propertyRules}</p>
                      </section>
                      <section>
                        <h4>{copy.foreignFormalities}</h4>
                        <p>{foreignLawContext.formalities}</p>
                      </section>
                      <section>
                        <h4>{copy.foreignWatchItems}</h4>
                        <ul>
                          {foreignLawContext.watchItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                      <section>
                        <h4>{copy.foreignQuestions}</h4>
                        <ul>
                          {foreignLawContext.questions.map((question) => (
                            <li key={question}>{question}</li>
                          ))}
                        </ul>
                      </section>
                      {coupleForeignChecks.length > 0 && (
                        <section>
                          <h4>{copy.foreignCoupleChecks}</h4>
                          <ul>
                            {coupleForeignChecks.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </section>
                      )}
                      {foreignLawContext.sources.length > 0 && (
                        <section>
                          <h4>{copy.foreignSources}</h4>
                          <ul>
                            {foreignLawContext.sources.map((source) => (
                              <li key={source.url}>
                                <a href={source.url} target="_blank" rel="noreferrer">
                                  {source.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>
                    <p className="foreign-law-disclaimer">{copy.foreignDisclaimer}</p>
                  </article>
                )}

                {incomeSnapshot.length > 0 && (
                  <article>
                    <h3>{copy.incomeAndGrowth}</h3>
                    <ul>
                      {incomeSnapshot.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </article>
                )}

                <article>
                  <h3>{copy.whyNeedPlanning}</h3>
                  <ul>
                    {(result.reasons.length ? result.reasons : ["The current answers show fewer major complexity flags, but state-law process and disclosure still matter."]).map(
                      (reason) => (
                        <li key={reason}>{reason}</li>
                      )
                    )}
                  </ul>
                </article>

                <article>
                  <h3>{copy.recommendedNextSteps}</h3>
                  <ul>
                    {nextSteps.map((nextStep) => (
                      <li key={nextStep}>{nextStep}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>{copy.estimatedCost}</h3>
                  <p>
                    <strong>{costEstimate.range}</strong>
                  </p>
                  <p>
                    {copy.stateAdjustment} {rule.name} uses a {costEstimate.stateCost.label}.
                  </p>
                  <p>{costEstimate.summary}</p>
                  <p>{copy.costDriverLabel} {costEstimate.factors.join(", ")}.</p>
                  <p>{costEstimate.stateCost.note}</p>
                  <p>
                    <a href={costEstimate.stateCost.sourceUrl} target="_blank" rel="noreferrer">
                      {copy.costSourceLabel}
                    </a>
                  </p>
                  <p>{costEstimate.note}</p>
                </article>

                {publicBenefitsSummary.length > 0 && (
                  <article className="public-benefits-card">
                    <div className="report-card-heading">
                      <Landmark size={22} aria-hidden="true" />
                      <h3>{copy.publicBenefitsTitle}</h3>
                    </div>
                    <ul>
                      {publicBenefitsSummary.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                )}

                <article className="attorney-topics-card">
                  <div className="report-card-heading">
                    <BriefcaseBusiness size={22} aria-hidden="true" />
                    <h3>{copy.attorneyTopics}</h3>
                  </div>
                  <ul>
                    {attorneyDiscussionTopics.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="materials-card">
                  <div className="report-card-heading">
                    <FileText size={22} aria-hidden="true" />
                    <h3>{copy.materialsTitle}</h3>
                  </div>
                  <p>{copy.materialsIntro}</p>
                  <ul>
                    {materialsChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="materials-privacy-note">{copy.materialsPrivacyNote}</p>
                </article>

                <article className="local-lawyer-card">
                  <div className="local-lawyer-heading">
                    <MapPin size={22} aria-hidden="true" />
                    <div>
                      <h3>{copy.localLawyersTitle}</h3>
                      <p>
                        {copy.localLawyersIntro} <strong>{localLawyerLinks.location}</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="lawyer-link-list">
                    {localLawyerLinks.links.map((link) => (
                      <a className="lawyer-link" href={link.url} key={link.key} target="_blank" rel="noreferrer">
                        <span>{copy[link.labelKey]}</span>
                        <ExternalLink size={17} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                  <p className="local-lawyer-disclaimer">{copy.localLawyersDisclaimer}</p>
                </article>

                {(currentAssetTotal > 0 || futureAssetTotal > 0) && (
                  <article>
                    <h3>{copy.assetSnapshot}</h3>
                    <ul>
                      {currentAssetTotal > 0 && <li>Estimated current asset/debt topics total: {formatCurrency(currentAssetTotal)}.</li>}
                      {futureAssetTotal > 0 && <li>Estimated future asset topics total: {formatCurrency(futureAssetTotal)}.</li>}
                      <li>{copy.assetEstimateNote}</li>
                    </ul>
                  </article>
                )}

                <article>
                  <h3>{copy.sourceNotes}</h3>
                  <ul>
                    {rule.sourceNotes.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          )}
        </div>

        <footer className="controls">
          <button type="button" onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0}>
            <ArrowLeft size={17} aria-hidden="true" />
            {copy.back}
          </button>
          <button
            className="primary"
            type="button"
            onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))}
            disabled={stepIndex === steps.length - 1}
          >
            {copy.next}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
