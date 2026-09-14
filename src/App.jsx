import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileText,
  Globe2,
  HeartHandshake,
  Home,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { stateRules } from "./data/stateRules";

const initialAnswers = {
  mode: "prenup",
  state: "MA",
  relationshipStage: "",
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
    brandTitle: "Prenup Planner",
    brandSubtitle: "Readiness and issue spotting",
    boundaryNote: "Educational planning only. This tool does not draft an agreement or replace legal counsel.",
    prototype: "Prototype v1",
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
    pathTitle: "Marital status",
    prenupReadiness: "Prenup readiness",
    prenupReadinessText: "For someone considering marriage or already engaged.",
    postnupReadiness: "Postnup readiness",
    postnupReadinessText: "For someone already married or in a legal partnership.",
    marriageLicenseState: "What state will the marriage license get filed?",
    timingPrenup: "Wedding timing and process",
    timingPostnup: "Postnup process readiness",
    weddingMonths: "How many months away is the wedding?",
    topicDiscussed: "Has the topic been discussed with the other person?",
    counsel: "Has either person spoken with an attorney?",
    disclosureStarted: "Have financial disclosures or documents been started?",
    pressure: "Is anyone feeling rushed or pressured?",
    assetsTitle: "Current and future assets",
    currentTopics: "Current financial topics",
    estimatedCurrentValues: "Estimated current values",
    futureTopics: "Future asset topics",
    estimatedFutureValues: "Estimated future values",
    currentTotal: "Current estimated total:",
    futureTotal: "Future estimated total:",
    complexityTitle: "Complexity flags",
    internationalQuestion: "Are any current or expected assets outside the United States?",
    foreignCountry: "Foreign country or jurisdiction connected to the asset",
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
    whyImportantItems: [
      "A prenup lets both people decide some financial rules in advance instead of leaving everything to default divorce law.",
      "It can protect separate property, family gifts, inheritances, business interests, and debt expectations if the relationship later ends.",
      "The process can force clearer disclosure and reduce surprises, which can matter even when the couple never divorces.",
      "It is not just about protecting the wealthier person; it can also create expectations for support, housing, or career sacrifices."
    ],
    mostAtRisk: "What may be most at risk",
    stateContext: "State context",
    foreignLawNote: "Foreign asset controlling-law note",
    incomeAndGrowth: "Expected income and growth",
    whyNeedPlanning: "Why this case may need planning",
    recommendedNextSteps: "Recommended next steps",
    estimatedCost: "Estimated attorney cost",
    stateAdjustment: "State adjustment:",
    costDriverLabel: "Main cost drivers:",
    attorneyTopics: "Attorney discussion topics",
    attorneyTopicItems: [
      "Whether independent counsel is recommended for each person.",
      "What financial disclosure should be prepared before negotiation.",
      "How future inheritances, gifts, appreciation, and commingling should be handled.",
      "Whether international assets require local counsel in another country."
    ],
    assetSnapshot: "Asset value snapshot",
    assetEstimateNote: "These are planning estimates only and should be replaced with formal disclosure numbers before signing.",
    sourceNotes: "Source notes",
    consequencesTitle: "Consequences simulator",
    storyEyebrow: "Slightly dramatic scenario",
    storyTitle: "If no agreement exists",
    statisticsTitle: "Divorce statistics context",
    statisticsDisclaimer:
      "This is benchmark context, not a prediction. Relationship data cannot reliably calculate one couple's divorce odds from a short planning questionnaire.",
    baselineRate:
      "A commonly cited broad US benchmark is that roughly 40%-50% of first marriages eventually end in divorce, with estimates varying by cohort, age, education, prior marriages, and data source.",
    complexityImpact:
      "The answers here are better at estimating divorce complexity than divorce probability. More assets, debt, timing pressure, income growth, or international property usually means a messier separation if divorce happens.",
    selectedStressors: "Selected stressors",
    noStressors: "No major stressors selected yet.",
    estimatedDisputeExposure: "Estimated dispute exposure",
    exposureLower: "Lower",
    exposureModerate: "Moderate",
    exposureHigh: "High",
    storyRefreshNote: "The story updates as the answers change."
  },
  es: {
    brandTitle: "Planificador Prenupcial",
    brandSubtitle: "Preparación e identificación de temas",
    boundaryNote: "Solo planificación educativa. Esta herramienta no redacta un acuerdo ni reemplaza a un abogado.",
    prototype: "Prototipo v1",
    languageLabel: "Idioma",
    planningValue: "valor de planificación",
    steps: { path: "Ruta", timing: "Tiempo", assets: "Activos", complexity: "Complejidad", consequences: "Consecuencias", report: "Reporte" },
    yes: "Sí",
    no: "No",
    unsure: "No estoy seguro",
    back: "Atrás",
    next: "Siguiente",
    pathTitle: "Estado civil",
    prenupReadiness: "Preparación prenupcial",
    prenupReadinessText: "Para alguien que está considerando casarse o ya está comprometido.",
    postnupReadiness: "Preparación postnupcial",
    postnupReadinessText: "Para alguien que ya está casado o en una unión legal.",
    marriageLicenseState: "¿En qué estado se presentará la licencia de matrimonio?",
    timingPrenup: "Tiempo de la boda y proceso",
    timingPostnup: "Preparación del proceso postnupcial",
    weddingMonths: "¿Cuántos meses faltan para la boda?",
    topicDiscussed: "¿Se ha hablado del tema con la otra persona?",
    counsel: "¿Alguna de las personas ha hablado con un abogado?",
    disclosureStarted: "¿Ya comenzaron las declaraciones o documentos financieros?",
    pressure: "¿Alguien se siente apurado o presionado?",
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
    whyImportantItems: [
      "Un acuerdo prenupcial permite que ambas personas decidan algunas reglas financieras por adelantado en vez de depender de la ley de divorcio predeterminada.",
      "Puede proteger bienes separados, regalos familiares, herencias, intereses de negocio y expectativas sobre deudas si la relación termina.",
      "El proceso puede exigir declaraciones más claras y reducir sorpresas, incluso si la pareja nunca se divorcia.",
      "No se trata solo de proteger a la persona con más patrimonio; también puede fijar expectativas sobre apoyo, vivienda o sacrificios profesionales."
    ],
    mostAtRisk: "Lo que puede estar en mayor riesgo",
    stateContext: "Contexto estatal",
    foreignLawNote: "Nota sobre ley aplicable a activos extranjeros",
    incomeAndGrowth: "Ingresos esperados y crecimiento",
    whyNeedPlanning: "Por qué este caso puede necesitar planificación",
    recommendedNextSteps: "Próximos pasos recomendados",
    estimatedCost: "Costo estimado de abogado",
    stateAdjustment: "Ajuste estatal:",
    costDriverLabel: "Factores principales de costo:",
    attorneyTopics: "Temas para hablar con el abogado",
    attorneyTopicItems: [
      "Si se recomienda abogado independiente para cada persona.",
      "Qué declaración financiera debe prepararse antes de negociar.",
      "Cómo manejar herencias futuras, regalos, apreciación y mezcla de fondos.",
      "Si los activos internacionales requieren abogado local en otro país."
    ],
    assetSnapshot: "Resumen de valores de activos",
    assetEstimateNote: "Estas son solo estimaciones de planificación y deben reemplazarse con cifras formales antes de firmar.",
    sourceNotes: "Notas de fuente"
  },
  ar: {
    brandTitle: "مخطط اتفاق ما قبل الزواج",
    brandSubtitle: "تقييم الجاهزية وتحديد المسائل",
    boundaryNote: "للتخطيط التعليمي فقط. هذه الأداة لا تصيغ اتفاقا ولا تغني عن الاستشارة القانونية.",
    prototype: "نموذج أولي v1",
    languageLabel: "اللغة",
    planningValue: "قيمة التخطيط",
    steps: { path: "المسار", timing: "التوقيت", assets: "الأصول", complexity: "التعقيد", consequences: "العواقب", report: "التقرير" },
    yes: "نعم",
    no: "لا",
    unsure: "غير متأكد",
    back: "السابق",
    next: "التالي",
    pathTitle: "الحالة الزوجية",
    prenupReadiness: "جاهزية اتفاق ما قبل الزواج",
    prenupReadinessText: "لمن يفكر في الزواج أو مخطوب بالفعل.",
    postnupReadiness: "جاهزية اتفاق ما بعد الزواج",
    postnupReadinessText: "لمن هو متزوج بالفعل أو في شراكة قانونية.",
    marriageLicenseState: "في أي ولاية سيتم تقديم رخصة الزواج؟",
    timingPrenup: "توقيت الزفاف والإجراءات",
    timingPostnup: "جاهزية إجراءات ما بعد الزواج",
    weddingMonths: "كم شهرا تبقى على الزفاف؟",
    topicDiscussed: "هل تمت مناقشة الموضوع مع الشخص الآخر؟",
    counsel: "هل تحدث أي من الطرفين مع محام؟",
    disclosureStarted: "هل بدأت الإفصاحات أو المستندات المالية؟",
    pressure: "هل يشعر أحد بالاستعجال أو الضغط؟",
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
    whyImportantItems: [
      "يسمح اتفاق ما قبل الزواج للطرفين بتحديد بعض القواعد المالية مسبقا بدلا من الاعتماد على قواعد الطلاق الافتراضية.",
      "يمكنه حماية الملكية المنفصلة والهدايا العائلية والميراث والمصالح التجارية وتوقعات الديون إذا انتهت العلاقة.",
      "يمكن أن يفرض إفصاحا أوضح ويقلل المفاجآت، حتى إذا لم يحدث طلاق.",
      "الأمر لا يتعلق فقط بحماية الطرف الأكثر ثراء؛ يمكنه أيضا تحديد توقعات الدعم أو السكن أو التضحيات المهنية."
    ],
    mostAtRisk: "ما قد يكون أكثر عرضة للخطر",
    stateContext: "سياق الولاية",
    foreignLawNote: "ملاحظة عن القانون الحاكم للأصول الأجنبية",
    incomeAndGrowth: "الدخل المتوقع والنمو",
    whyNeedPlanning: "لماذا قد تحتاج هذه الحالة إلى تخطيط",
    recommendedNextSteps: "الخطوات التالية المقترحة",
    estimatedCost: "التكلفة المقدرة للمحامي",
    stateAdjustment: "تعديل الولاية:",
    costDriverLabel: "عوامل التكلفة الرئيسية:",
    attorneyTopics: "مواضيع النقاش مع المحامي",
    attorneyTopicItems: [
      "ما إذا كان يوصى بمحام مستقل لكل طرف.",
      "ما الإفصاح المالي الذي يجب تحضيره قبل التفاوض.",
      "كيفية التعامل مع الميراث والهدايا والزيادة في القيمة واختلاط الأموال.",
      "ما إذا كانت الأصول الدولية تتطلب محاميا محليا في دولة أخرى."
    ],
    assetSnapshot: "ملخص قيمة الأصول",
    assetEstimateNote: "هذه تقديرات للتخطيط فقط ويجب استبدالها بأرقام إفصاح رسمية قبل التوقيع.",
    sourceNotes: "ملاحظات المصادر"
  },
  zh: {
    brandTitle: "婚前协议规划器",
    brandSubtitle: "准备度与问题识别",
    boundaryNote: "仅用于教育性规划。本工具不会起草协议，也不能替代律师建议。",
    prototype: "原型 v1",
    languageLabel: "语言",
    planningValue: "规划价值",
    steps: { path: "路径", timing: "时间", assets: "资产", complexity: "复杂度", consequences: "后果", report: "报告" },
    yes: "是",
    no: "否",
    unsure: "不确定",
    back: "返回",
    next: "下一步",
    pathTitle: "婚姻状态",
    prenupReadiness: "婚前协议准备度",
    prenupReadinessText: "适用于正在考虑结婚或已经订婚的人。",
    postnupReadiness: "婚后协议准备度",
    postnupReadinessText: "适用于已经结婚或处于法律伴侣关系的人。",
    marriageLicenseState: "结婚许可证将在哪个州提交？",
    timingPrenup: "婚礼时间与流程",
    timingPostnup: "婚后协议流程准备度",
    weddingMonths: "距离婚礼还有几个月？",
    topicDiscussed: "是否已和对方讨论过这个话题？",
    counsel: "任一方是否已经咨询过律师？",
    disclosureStarted: "是否已经开始准备财务披露或文件？",
    pressure: "是否有人感到仓促或受压？",
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
    whyImportantItems: [
      "婚前协议让双方提前决定部分财务规则，而不是完全依赖离婚时的默认法律。",
      "如果关系结束，它可以保护个人财产、家庭赠与、继承、企业权益和债务预期。",
      "这个过程可以促使更清楚的披露并减少意外，即使夫妻最终从未离婚。",
      "它不只是保护更富有的一方；也可以设定扶养、住房或职业牺牲方面的预期。"
    ],
    mostAtRisk: "最可能存在风险的事项",
    stateContext: "州法律背景",
    foreignLawNote: "外国资产适用法律提示",
    incomeAndGrowth: "预期收入和增长",
    whyNeedPlanning: "为什么此情况可能需要规划",
    recommendedNextSteps: "建议的下一步",
    estimatedCost: "律师费用估计",
    stateAdjustment: "州调整：",
    costDriverLabel: "主要费用因素：",
    attorneyTopics: "与律师讨论的事项",
    attorneyTopicItems: [
      "是否建议双方各自聘请独立律师。",
      "谈判前应准备哪些财务披露。",
      "如何处理未来继承、赠与、增值和资金混同。",
      "国际资产是否需要其他国家的当地律师。"
    ],
    assetSnapshot: "资产价值摘要",
    assetEstimateNote: "这些只是规划估计，签署前应以正式披露数字替代。",
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

function getStateCostAdjustment(stateCode) {
  const highCostStates = new Set(["CA", "CT", "IL", "MA", "MD", "NJ", "NY", "VA", "WA"]);
  const lowerCostStates = new Set([
    "AL",
    "AR",
    "IA",
    "ID",
    "IN",
    "KS",
    "KY",
    "LA",
    "MO",
    "MS",
    "NE",
    "ND",
    "OK",
    "SD",
    "WV",
    "WY"
  ]);

  if (highCostStates.has(stateCode)) {
    return {
      multiplier: 1.25,
      label: "higher-cost legal market",
      note: "The selected state is treated as a higher-cost legal market, so the estimate is adjusted upward."
    };
  }

  if (lowerCostStates.has(stateCode)) {
    return {
      multiplier: 0.85,
      label: "lower-cost legal market",
      note: "The selected state is treated as a lower-cost legal market, so the estimate is adjusted downward."
    };
  }

  return {
    multiplier: 1,
    label: "typical-cost legal market",
    note: "The selected state is treated as a typical-cost legal market for this rough estimate."
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
      "This is a rough US private-attorney drafting and review estimate. Actual cost depends on location, lawyer rates, negotiation, disclosure quality, and whether each person hires separate counsel."
  };
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

function getConsequenceStory(answers, rule, context, costEstimate) {
  const agreementName = answers.mode === "prenup" ? "prenup" : "postnup";
  const assetPhrase = answers.currentAssets.length
    ? `The first argument starts with ${answers.currentAssets.slice(0, 3).join(", ").toLowerCase()}`
    : "The first argument starts with a checking account, a vague memory of who paid for what, and one spreadsheet named FINAL-final-use-this-one.xlsx";
  const futurePhrase = answers.futureAssets.length
    ? `Then someone remembers the ${answers.futureAssets.slice(0, 2).join(" and ").toLowerCase()} that was supposed to be simple. It is not simple.`
    : "Then the conversation finds future money anyway, because future money has excellent timing and terrible manners.";
  const internationalPhrase =
    answers.internationalAssets === "yes" || answers.internationalAssets === "unsure"
      ? `A foreign-asset issue appears, and suddenly the divorce has side quests in ${answers.foreignCountry || "another country"}.`
      : "At least there is no foreign-asset side quest. Small mercy.";
  const incomePhrase =
    answers.incomeGap === "yes" || getIncomeSnapshot(answers).length > 0
      ? "Income growth becomes a debate about what was earned, what was expected, and whose sacrifices made the lifestyle possible."
      : "Income is less dramatic here, which is good. The paperwork finds plenty of other ways to be annoying.";

  return [
    `Imagine nobody signs a ${agreementName}. Years later, the relationship ends, and ${rule.name}'s default ${rule.propertySystem.toLowerCase()} rules walk into the room carrying a clipboard.`,
    `${assetPhrase}. ${futurePhrase}`,
    `${internationalPhrase} ${incomePhrase}`,
    `Instead of calmly pointing to a signed agreement, everyone pays lawyers to reconstruct intent from old emails, bank transfers, half-remembered conversations, and screenshots that somehow all have 3% battery.`,
    `The estimated attorney-cost range for drafting now is ${costEstimate.range}. The cost of fighting later is not shown here because the app is educational, not cruel.`,
    `Dispute exposure based on the current answers: ${context.exposure}. Translation: the ${agreementName} conversation may be awkward now, but future-you may consider that a bargain.`
  ];
}

function getForeignLawContext(countryInput) {
  const country = countryInput.trim();
  if (!country) {
    return {
      label: "Foreign jurisdiction not specified",
      summary:
        "Foreign assets may be governed by the law of the place where the asset is located, especially for real estate, title, inheritance, tax, and local enforcement.",
      nextStep: "List each foreign country or jurisdiction before meeting with counsel so the attorney can check whether local legal advice is needed."
    };
  }

  const normalized = country.toLowerCase();
  const matches = [
    {
      terms: ["canada"],
      label: "Canada",
      summary:
        "Canadian family-property rules vary by province, so the controlling law question may depend on where the asset is located and where the spouses live.",
      nextStep: "Identify the province connected to the asset and ask whether Canadian provincial counsel should review title, inheritance, and enforceability."
    },
    {
      terms: ["england", "wales", "united kingdom", "uk", "scotland"],
      label: "United Kingdom",
      summary:
        "UK treatment can differ by jurisdiction, and nuptial agreements may be evaluated differently than in many US states. Local law may matter for property and enforcement.",
      nextStep: "Clarify whether the asset is in England and Wales, Scotland, or Northern Ireland and ask about local advice before relying on US agreement language."
    },
    {
      terms: ["mexico"],
      label: "Mexico",
      summary:
        "Mexican property and marital-regime issues can depend on the state, title records, and whether the property is real estate or another asset type.",
      nextStep: "Identify the Mexican state and asset type, then ask whether Mexican counsel should review title, marital-property treatment, and enforcement."
    },
    {
      terms: ["india"],
      label: "India",
      summary:
        "Indian law can raise separate questions around property title, inheritance, family law, religion-based personal law, and practical enforceability.",
      nextStep: "Ask counsel whether Indian local advice is needed for ownership, inheritance, and whether the US agreement would be recognized in practice."
    },
    {
      terms: ["china", "hong kong"],
      label: "China / Hong Kong",
      summary:
        "Property located in China or Hong Kong may involve local ownership, transfer, inheritance, currency, and enforcement rules that a US agreement alone may not control.",
      nextStep: "Separate mainland China and Hong Kong assets and ask counsel whether local advice is needed for title, transfer restrictions, and enforcement."
    },
    {
      terms: ["france"],
      label: "France",
      summary:
        "French marital-property and inheritance rules can differ substantially from US default rules, especially for real property and forced-heirship issues.",
      nextStep: "Ask whether French counsel should review real estate, inheritance expectations, marital regime, and whether any separate French agreement is needed."
    },
    {
      terms: ["italy"],
      label: "Italy",
      summary:
        "Italian law may matter for real property, marital-property regime, inheritance, and local recording or enforcement issues.",
      nextStep: "Ask counsel whether Italian advice is needed for property title, inheritance, and any local formalities."
    },
    {
      terms: ["germany"],
      label: "Germany",
      summary:
        "German marital-property, inheritance, and notarial/formality rules may affect how foreign assets are treated or documented.",
      nextStep: "Ask whether German counsel or a notary is needed for property, inheritance, and enforceability questions."
    },
    {
      terms: ["uae", "united arab emirates", "dubai", "abu dhabi"],
      label: "United Arab Emirates",
      summary:
        "UAE assets can involve local property ownership, inheritance, family-law, and forum issues that may not track US assumptions.",
      nextStep: "Identify the emirate connected to the asset and ask whether UAE counsel should review ownership, inheritance, and enforcement."
    },
    {
      terms: ["australia"],
      label: "Australia",
      summary:
        "Australian family-law treatment and enforceability may differ from US state law, and property location can still matter.",
      nextStep: "Ask whether Australian counsel should review the agreement if meaningful assets, residence, or enforcement questions connect to Australia."
    }
  ];

  const match = matches.find((item) => item.terms.some((term) => normalized.includes(term)));
  if (match) return match;

  return {
    label: country,
    summary:
      `${country} may have its own rules for property title, inheritance, tax, marital-property classification, and whether a US prenup or postnup will be recognized.`,
    nextStep: `Ask counsel to check whether local legal advice is needed in ${country}, especially if the asset is real estate, family property, business ownership, or inheritance-related.`
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
  foreignLawContext
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
  y = addPdfSection(doc, copy.whyImportant, copy.whyImportantItems, y);

  y = addPdfSection(doc, copy.mostAtRisk, riskItems, y);

  y = addPdfSection(doc, copy.recommendedNextSteps, nextSteps, y);

  y = addPdfSection(doc, copy.estimatedCost, [
    `Estimated range: ${costEstimate.range}.`,
    `${copy.stateAdjustment} ${rule.name} is treated as a ${costEstimate.stateCost.label}.`,
    costEstimate.summary,
    `${copy.costDriverLabel} ${costEstimate.factors.join(", ")}.`,
    costEstimate.stateCost.note,
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
    y = addPdfSection(doc, copy.foreignLawNote, [
      `${foreignLawContext.label}: ${foreignLawContext.summary}`,
      foreignLawContext.nextStep
    ], y);
  }

  if (currentAssetTotal > 0 || futureAssetTotal > 0) {
    const assetLines = [];
    if (currentAssetTotal > 0) assetLines.push(`Estimated current asset/debt topics total: ${formatCurrency(currentAssetTotal)}.`);
    if (futureAssetTotal > 0) assetLines.push(`Estimated future asset topics total: ${formatCurrency(futureAssetTotal)}.`);
    assetLines.push(copy.assetEstimateNote);
    y = addPdfSection(doc, copy.assetSnapshot, assetLines, y);
  }

  y = addPdfSection(doc, copy.attorneyTopics, copy.attorneyTopicItems, y);

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

function App() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [language, setLanguage] = useState("en");
  const [stepIndex, setStepIndex] = useState(0);
  const copy = getCopy(language);
  const rule = stateRules[answers.state];
  const result = useMemo(() => scoreAnswers(answers), [answers]);
  const currentAssetTotal = useMemo(() => getAssetTotal(answers.currentAssetValues), [answers.currentAssetValues]);
  const futureAssetTotal = useMemo(() => getAssetTotal(answers.futureAssetValues), [answers.futureAssetValues]);
  const incomeSnapshot = useMemo(() => getIncomeSnapshot(answers), [answers]);
  const riskItems = useMemo(() => getRiskItems(answers, rule), [answers, rule]);
  const nextSteps = useMemo(() => getNextSteps(answers), [answers]);
  const costEstimate = useMemo(() => getCostEstimate(answers, result), [answers, result]);
  const consequenceContext = useMemo(
    () => getConsequenceContext(answers, result, currentAssetTotal, futureAssetTotal),
    [answers, result, currentAssetTotal, futureAssetTotal]
  );
  const consequenceStory = useMemo(
    () => getConsequenceStory(answers, rule, consequenceContext, costEstimate),
    [answers, rule, consequenceContext, costEstimate]
  );
  const foreignLawContext = useMemo(() => getForeignLawContext(answers.foreignCountry), [answers.foreignCountry]);

  const setAnswer = (key, value) => setAnswers((current) => ({ ...current, [key]: value }));
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
            const label = copy.steps[item.id];
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
            <p className="eyebrow">{copy.prototype}</p>
            <h1>{copy.steps[step.id]}</h1>
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
              <label>
                {copy.internationalQuestion}
                <YesNo copy={copy} value={answers.internationalAssets} onChange={(value) => setAnswer("internationalAssets", value)} />
              </label>

              {(answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") && (
                <label>
                  {copy.foreignCountry}
                  <input
                    type="text"
                    value={answers.foreignCountry}
                    onChange={(event) => setAnswer("foreignCountry", event.target.value)}
                    placeholder="Example: Canada, France, India, Dubai"
                  />
                </label>
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
                  <div className="stat-row">
                    <span>40%-50%</span>
                    <p>{copy.baselineRate}</p>
                  </div>
                  <p>{copy.complexityImpact}</p>
                  <h3>{copy.selectedStressors}</h3>
                  {consequenceContext.stressors.length > 0 ? (
                    <ul>
                      {consequenceContext.stressors.map((stressor) => (
                        <li key={stressor}>{stressor}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{copy.noStressors}</p>
                  )}
                </article>
              </div>
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
                        foreignLawContext
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
                <article>
                  <h3>{copy.whyImportant}</h3>
                  <ul>
                    {copy.whyImportantItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
                  <article>
                    <h3>{copy.foreignLawNote}</h3>
                    <p>
                      <strong>{foreignLawContext.label}: </strong>
                      {foreignLawContext.summary}
                    </p>
                    <p>{foreignLawContext.nextStep}</p>
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
                    {copy.stateAdjustment} {rule.name} is treated as a {costEstimate.stateCost.label}.
                  </p>
                  <p>{costEstimate.summary}</p>
                  <p>{copy.costDriverLabel} {costEstimate.factors.join(", ")}.</p>
                  <p>{costEstimate.stateCost.note}</p>
                  <p>{costEstimate.note}</p>
                </article>

                <article>
                  <h3>{copy.attorneyTopics}</h3>
                  <ul>
                    {copy.attorneyTopicItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
