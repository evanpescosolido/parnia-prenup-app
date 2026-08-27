const communityPropertyStates = new Set(["AZ", "CA", "ID", "LA", "NV", "NM", "TX", "WA", "WI"]);

const states = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"]
];

const defaultSourceNotes = [
  "Uniform Premarital Agreement Act or state-specific premarital agreement law where adopted",
  "State domestic relations statutes and contract-law enforceability principles"
];

function buildRule(code, name) {
  const isCommunityProperty = communityPropertyStates.has(code);
  const propertySystem = isCommunityProperty ? "Community property" : "Equitable distribution";
  const propertyContext = isCommunityProperty
    ? "This state generally starts from a community-property framework, so separate property, marital/community property, appreciation, income, and debt classification should be addressed directly."
    : "This state generally uses an equitable-distribution framework, so property division can depend on classification, fairness factors, disclosure, and judicial review.";

  return {
    name,
    propertySystem,
    prenupContext: `${name} generally permits premarital agreements, but enforceability depends on state-specific requirements such as voluntariness, adequate disclosure, formal execution, and public-policy limits. ${propertyContext}`,
    postnupContext: `${name} may treat marital or postnuptial agreements differently from premarital agreements, so spouses should pay close attention to disclosure, fairness, independent counsel, and the duties owed after marriage.`,
    timing: "Starting early helps reduce challenge risk tied to pressure, rushed review, incomplete disclosure, or last-minute signing.",
    futureAssets:
      "Future inheritances, gifts, appreciation, separate-property income, business growth, and later home purchases should be addressed expressly if protection is a goal.",
    international:
      "Foreign property can raise recognition, enforcement, tax, inheritance, title, and local-law issues beyond the selected state's family-law rules.",
    sourceNotes: defaultSourceNotes
  };
}

const stateOverrides = {
  MA: {
    propertySystem: "Equitable distribution",
    prenupContext:
      "Massachusetts generally allows premarital agreements, but enforceability can turn on process, disclosure, voluntariness, and fairness when enforcement is sought.",
    postnupContext:
      "Massachusetts recognizes postnuptial agreements, but they may receive close review because spouses already owe duties to each other.",
    timing: "A rushed agreement close to the wedding can increase process-risk concerns.",
    futureAssets:
      "Future inheritances, gifts, appreciation, and income from separate property should be discussed directly in the agreement if protection is a goal.",
    international:
      "Foreign property can raise recognition, enforcement, tax, inheritance, and local-law issues beyond Massachusetts family law.",
    sourceNotes: [
      "Mass. Gen. Laws ch. 209, section 25",
      "Massachusetts case law on premarital and marital agreement enforceability"
    ]
  },
  CA: {
    propertySystem: "Community property",
    prenupContext:
      "California is a community-property state and has specific statutory requirements for premarital agreements, including voluntariness and process protections.",
    postnupContext:
      "California spouses owe fiduciary duties to each other, so postmarital agreements require careful disclosure and process.",
    timing:
      "California has specific timing and review protections for premarital agreements, so users should begin early and avoid last-minute signing.",
    futureAssets:
      "Future inheritance, gifts, separate-property appreciation, and business growth should be identified carefully to avoid later disputes over community-property claims.",
    international:
      "Cross-border assets may require California counsel plus counsel in the country where the asset is located.",
    sourceNotes: ["California Family Code sections 1500-1617", "California Family Code section 721"]
  },
  NY: {
    propertySystem: "Equitable distribution",
    prenupContext:
      "New York generally allows premarital agreements, with enforceability depending on formal execution, disclosure, voluntariness, and fairness concerns.",
    postnupContext:
      "New York permits marital agreements, but users should treat disclosure, independent counsel, and absence of pressure as especially important.",
    timing: "Last-minute execution may create avoidable challenge risk.",
    futureAssets:
      "Inheritances and gifts are often treated differently from marital property, but commingling, joint titling, and appreciation can complicate that treatment.",
    international:
      "International property may involve enforceability and ownership issues outside New York law.",
    sourceNotes: ["New York Domestic Relations Law section 236", "New York contract and family-law enforceability principles"]
  }
};

export const stateRules = Object.fromEntries(
  states.map(([code, name]) => [code, { ...buildRule(code, name), ...stateOverrides[code] }])
);
