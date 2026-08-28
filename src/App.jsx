import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
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
  { id: "timing", label: "Timing", icon: AlertTriangle },
  { id: "assets", label: "Assets", icon: Landmark },
  { id: "complexity", label: "Complexity", icon: Globe2 },
  { id: "report", label: "Report", icon: FileText }
];

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

function getCostEstimate(answers, result) {
  const factors = [];
  let tier = result.level;

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
      range: "$1,500-$3,500",
      summary: "A simpler agreement with clear assets, modest negotiation, and fewer special issues may fall in this range."
    },
    Moderate: {
      range: "$3,500-$7,500",
      summary: "A more customized agreement with meaningful assets, disclosure work, negotiation, or support terms often falls in this range."
    },
    High: {
      range: "$7,500-$15,000+",
      summary: "Complex matters involving businesses, major real estate, foreign assets, high income, family wealth, or heavier negotiation can exceed this range."
    }
  };

  return {
    tier,
    ...ranges[tier],
    factors: factors.length > 0 ? factors : ["no major complexity factor selected yet"],
    note:
      "This is a rough US private-attorney drafting and review estimate. Actual cost depends on location, lawyer rates, negotiation, disclosure quality, and whether each person hires separate counsel."
  };
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
  doc.text("Prenup Planner Report", 18, 20);
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
  y = addPdfSection(doc, "Plain-English Summary", [
    "A prenup lets both people decide some financial rules in advance instead of leaving everything to default divorce law.",
    "It can protect separate property, family gifts, inheritances, business interests, and debt expectations if the relationship later ends.",
    "It is not only about protecting the wealthier person. It can also set expectations around support, housing, disclosure, or career sacrifices."
  ], y);

  y = addPdfSection(doc, "What May Be Most At Risk In Divorce", riskItems, y);

  y = addPdfSection(doc, "Recommended Next Steps", nextSteps, y);

  y = addPdfSection(doc, "Estimated Attorney Cost", [
    `Estimated range: ${costEstimate.range}.`,
    costEstimate.summary,
    `Main cost drivers: ${costEstimate.factors.join(", ")}.`,
    costEstimate.note
  ], y);

  if (incomeSnapshot.length > 0) {
    y = addPdfSection(doc, "Expected Income And Growth", incomeSnapshot, y);
  }

  y = addPdfSection(doc, "State Law Context", [
    answers.mode === "prenup" ? rule.prenupContext : rule.postnupContext,
    rule.timing,
    rule.futureAssets,
    rule.international
  ], y);

  if (answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") {
    y = addPdfSection(doc, "Foreign Asset Controlling-Law Note", [
      `${foreignLawContext.label}: ${foreignLawContext.summary}`,
      foreignLawContext.nextStep
    ], y);
  }

  if (currentAssetTotal > 0 || futureAssetTotal > 0) {
    const assetLines = [];
    if (currentAssetTotal > 0) assetLines.push(`Estimated current asset/debt topics total: ${formatCurrency(currentAssetTotal)}.`);
    if (futureAssetTotal > 0) assetLines.push(`Estimated future asset topics total: ${formatCurrency(futureAssetTotal)}.`);
    assetLines.push("These are planning estimates only and should be replaced with formal disclosure numbers before signing.");
    y = addPdfSection(doc, "Asset Value Snapshot", assetLines, y);
  }

  y = addPdfSection(doc, "Attorney Discussion Topics", [
    "Whether independent counsel is recommended for each person.",
    "What financial disclosure should be prepared before negotiation.",
    "How future inheritances, gifts, appreciation, and commingling should be handled.",
    "Whether international assets require local counsel in another country."
  ], y);

  y = addPdfSection(doc, "Source Notes", rule.sourceNotes, y);

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

function YesNo({ value, onChange }) {
  return (
    <div className="segmented" role="group">
      <button className={value === "yes" ? "active" : ""} type="button" onClick={() => onChange("yes")}>
        Yes
      </button>
      <button className={value === "no" ? "active" : ""} type="button" onClick={() => onChange("no")}>
        No
      </button>
      <button className={value === "unsure" ? "active" : ""} type="button" onClick={() => onChange("unsure")}>
        Unsure
      </button>
    </div>
  );
}

function App() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const rule = stateRules[answers.state];
  const result = useMemo(() => scoreAnswers(answers), [answers]);
  const currentAssetTotal = useMemo(() => getAssetTotal(answers.currentAssetValues), [answers.currentAssetValues]);
  const futureAssetTotal = useMemo(() => getAssetTotal(answers.futureAssetValues), [answers.futureAssetValues]);
  const incomeSnapshot = useMemo(() => getIncomeSnapshot(answers), [answers]);
  const riskItems = useMemo(() => getRiskItems(answers, rule), [answers, rule]);
  const nextSteps = useMemo(() => getNextSteps(answers), [answers]);
  const costEstimate = useMemo(() => getCostEstimate(answers, result), [answers, result]);
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
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Scale size={28} aria-hidden="true" />
          <div>
            <p>Prenup Planner</p>
            <span>Readiness and issue spotting</span>
          </div>
        </div>

        <nav className="step-list" aria-label="Planner sections">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                className={index === stepIndex ? "step active" : "step"}
                key={item.id}
                type="button"
                onClick={() => setStepIndex(index)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="boundary-note">
          <ShieldCheck size={18} aria-hidden="true" />
          <p>Educational planning only. This tool does not draft an agreement or replace legal counsel.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Prototype v1</p>
            <h1>{step.label}</h1>
          </div>
          <div className={`score-pill ${result.level.toLowerCase()}`}>
            <Sparkles size={16} aria-hidden="true" />
            {result.level} planning value
          </div>
        </header>

        <div className="panel">
          {step.id === "path" && (
            <FieldGroup title="Choose the planning path">
              <div className="choice-grid two">
                <ChoiceButton active={answers.mode === "prenup"} onClick={() => setAnswer("mode", "prenup")}>
                  <BadgeCheck size={22} aria-hidden="true" />
                  <strong>Prenup readiness</strong>
                  <span>For someone considering marriage or already engaged.</span>
                </ChoiceButton>
                <ChoiceButton active={answers.mode === "postnup"} onClick={() => setAnswer("mode", "postnup")}>
                  <HeartHandshake size={22} aria-hidden="true" />
                  <strong>Postnup readiness</strong>
                  <span>For someone already married or in a legal partnership.</span>
                </ChoiceButton>
              </div>

              <label>
                State law context
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
            <FieldGroup title={answers.mode === "prenup" ? "Wedding timing and process" : "Postnup process readiness"}>
              {answers.mode === "prenup" && (
                <label>
                  How many months away is the wedding?
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
                Has the topic been discussed with the other person?
                <YesNo value={answers.discussedWithPartner} onChange={(value) => setAnswer("discussedWithPartner", value)} />
              </label>

              <label>
                Has either person spoken with an attorney?
                <YesNo value={answers.counsel} onChange={(value) => setAnswer("counsel", value)} />
              </label>

              <label>
                Have financial disclosures or documents been started?
                <YesNo value={answers.disclosureStarted} onChange={(value) => setAnswer("disclosureStarted", value)} />
              </label>

              <label>
                Is anyone feeling rushed or pressured?
                <YesNo value={answers.pressure} onChange={(value) => setAnswer("pressure", value)} />
              </label>
            </FieldGroup>
          )}

          {step.id === "assets" && (
            <FieldGroup title="Current and future assets">
              <div>
                <p className="label-text">Current financial topics</p>
                <div className="chip-grid">
                  {assetOptions.map((asset) => (
                    <button
                      className={answers.currentAssets.includes(asset) ? "chip selected" : "chip"}
                      key={asset}
                      type="button"
                      onClick={() => toggleAsset("currentAssets", "currentAssetValues", asset)}
                    >
                      {asset}
                    </button>
                  ))}
                </div>
              </div>

              {answers.currentAssets.length > 0 && (
                <div className="asset-value-list">
                  <p className="label-text">Estimated current values</p>
                  {answers.currentAssets.map((asset) => (
                    <label className="asset-value-row" key={asset}>
                      <span>{asset}</span>
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
                  {currentAssetTotal > 0 && <p className="asset-total">Current estimated total: {formatCurrency(currentAssetTotal)}</p>}
                </div>
              )}

              <div>
                <p className="label-text">Future asset topics</p>
                <div className="chip-grid">
                  {futureAssetOptions.map((asset) => (
                    <button
                      className={answers.futureAssets.includes(asset) ? "chip selected" : "chip"}
                      key={asset}
                      type="button"
                      onClick={() => toggleAsset("futureAssets", "futureAssetValues", asset)}
                    >
                      {asset}
                    </button>
                  ))}
                </div>
              </div>

              {answers.futureAssets.length > 0 && (
                <div className="asset-value-list">
                  <p className="label-text">Estimated future values</p>
                  {answers.futureAssets.map((asset) => (
                    <label className="asset-value-row" key={asset}>
                      <span>{asset}</span>
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
                  {futureAssetTotal > 0 && <p className="asset-total">Future estimated total: {formatCurrency(futureAssetTotal)}</p>}
                </div>
              )}

              <div className="state-summary">
                <Landmark size={20} aria-hidden="true" />
                <p>{rule.futureAssets}</p>
              </div>
            </FieldGroup>
          )}

          {step.id === "complexity" && (
            <FieldGroup title="Complexity flags">
              <label>
                Are any current or expected assets outside the United States?
                <YesNo value={answers.internationalAssets} onChange={(value) => setAnswer("internationalAssets", value)} />
              </label>

              {(answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") && (
                <label>
                  Foreign country or jurisdiction connected to the asset
                  <input
                    type="text"
                    value={answers.foreignCountry}
                    onChange={(event) => setAnswer("foreignCountry", event.target.value)}
                    placeholder="Example: Canada, France, India, Dubai"
                  />
                </label>
              )}

              <label>
                Is there a meaningful income or wealth gap?
                <YesNo value={answers.incomeGap} onChange={(value) => setAnswer("incomeGap", value)} />
              </label>

              <div className="asset-value-list">
                <p className="label-text">Expected income and growth during the marriage</p>
                <div className="income-grid">
                  <label>
                    Current estimated annual income
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
                    Expected future annual income
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
                  Expected income growth context
                  <input
                    type="text"
                    value={answers.expectedIncomeGrowth}
                    onChange={(event) => setAnswer("expectedIncomeGrowth", event.target.value)}
                    placeholder="Example: medical residency, law firm track, startup equity, family business"
                  />
                </label>
              </div>

              <label>
                Does either person own or expect to own a business?
                <YesNo value={answers.business} onChange={(value) => setAnswer("business", value)} />
              </label>

              <label>
                Is real estate involved?
                <YesNo value={answers.realEstate} onChange={(value) => setAnswer("realEstate", value)} />
              </label>

              <label>
                Are debts, student loans, children, or career sacrifices part of the picture?
                <div className="mini-grid">
                  <span>Debt</span>
                  <YesNo value={answers.debts} onChange={(value) => setAnswer("debts", value)} />
                  <span>Children</span>
                  <YesNo value={answers.children} onChange={(value) => setAnswer("children", value)} />
                  <span>Career sacrifice</span>
                  <YesNo value={answers.careerSacrifice} onChange={(value) => setAnswer("careerSacrifice", value)} />
                </div>
              </label>

              <div className="state-summary">
                <Globe2 size={20} aria-hidden="true" />
                <p>{rule.international}</p>
              </div>
            </FieldGroup>
          )}

          {step.id === "report" && (
            <section className="report">
              <div className="report-header">
                <div>
                  <p className="eyebrow">Planning report</p>
                  <h2>{result.level} value in discussing an agreement</h2>
                </div>
                <div className="report-actions">
                  <button
                    className="download-button"
                    type="button"
                    onClick={() =>
                      generateReportPdf({
                        answers,
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
                    Download PDF
                  </button>
                  <div className={`score-badge ${result.level.toLowerCase()}`}>{result.score}</div>
                </div>
              </div>

              <div className="report-grid">
                <article>
                  <h3>Why a prenup can be important</h3>
                  <ul>
                    <li>A prenup lets both people decide some financial rules in advance instead of leaving everything to default divorce law.</li>
                    <li>It can protect separate property, family gifts, inheritances, business interests, and debt expectations if the relationship later ends.</li>
                    <li>The process can force clearer disclosure and reduce surprises, which can matter even when the couple never divorces.</li>
                    <li>It is not just about protecting the wealthier person; it can also create expectations for support, housing, or career sacrifices.</li>
                  </ul>
                </article>

                <article>
                  <h3>What may be most at risk</h3>
                  <ul>
                    {riskItems.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>State context</h3>
                  <p>{answers.mode === "prenup" ? rule.prenupContext : rule.postnupContext}</p>
                  <p>{rule.timing}</p>
                </article>

                {(answers.internationalAssets === "yes" || answers.internationalAssets === "unsure") && (
                  <article>
                    <h3>Foreign asset controlling-law note</h3>
                    <p>
                      <strong>{foreignLawContext.label}: </strong>
                      {foreignLawContext.summary}
                    </p>
                    <p>{foreignLawContext.nextStep}</p>
                  </article>
                )}

                {incomeSnapshot.length > 0 && (
                  <article>
                    <h3>Expected income and growth</h3>
                    <ul>
                      {incomeSnapshot.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </article>
                )}

                <article>
                  <h3>Why this case may need planning</h3>
                  <ul>
                    {(result.reasons.length ? result.reasons : ["The current answers show fewer major complexity flags, but state-law process and disclosure still matter."]).map(
                      (reason) => (
                        <li key={reason}>{reason}</li>
                      )
                    )}
                  </ul>
                </article>

                <article>
                  <h3>Recommended next steps</h3>
                  <ul>
                    {nextSteps.map((nextStep) => (
                      <li key={nextStep}>{nextStep}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>Estimated attorney cost</h3>
                  <p>
                    <strong>{costEstimate.range}</strong>
                  </p>
                  <p>{costEstimate.summary}</p>
                  <p>Main cost drivers: {costEstimate.factors.join(", ")}.</p>
                  <p>{costEstimate.note}</p>
                </article>

                <article>
                  <h3>Attorney discussion topics</h3>
                  <ul>
                    <li>Whether independent counsel is recommended for each person.</li>
                    <li>What financial disclosure should be prepared before negotiation.</li>
                    <li>How future inheritances, gifts, appreciation, and commingling should be handled.</li>
                    <li>Whether international assets require local counsel in another country.</li>
                  </ul>
                </article>

                {(currentAssetTotal > 0 || futureAssetTotal > 0) && (
                  <article>
                    <h3>Asset value snapshot</h3>
                    <ul>
                      {currentAssetTotal > 0 && <li>Estimated current asset/debt topics total: {formatCurrency(currentAssetTotal)}.</li>}
                      {futureAssetTotal > 0 && <li>Estimated future asset topics total: {formatCurrency(futureAssetTotal)}.</li>}
                      <li>These are planning estimates only and should be replaced with formal disclosure numbers before signing.</li>
                    </ul>
                  </article>
                )}

                <article>
                  <h3>Source notes</h3>
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
            Back
          </button>
          <button
            className="primary"
            type="button"
            onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))}
            disabled={stepIndex === steps.length - 1}
          >
            Next
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
