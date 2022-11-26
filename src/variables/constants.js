export const mailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const alphabetsPattern = /^[A-Za-z ]+$/;

export const positiveNumb = /^[0-9]+$/;

export const strongPwd =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

export const nonstrongPwd =
  /(?=.*[a-z])(?=.*)(?=.*[0-9])(?=.*[^a-z0-9])(?=.{8,})/;

export const mediumPwd =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

export const date = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;

export const website =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&\'\(\)\*\+,;=.]+$/;

export const uploadURL = "https://vrittigroup.com:5000/data/uploads/";

export const MainURL = "https://f90b-103-141-112-24.in.ngrok.io/api/user";

export const phone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{9}$/;

export const image = /(.png|.jpg|.jpeg|.heic)/;

export const experience = [
  { value: "", label: "" },
  { value: "Fresher", label: "Fresher" },
  { value: "1-5", label: "1-5" },
  { value: "6-10", label: "6-10" },
  { value: "11-15", label: "11-15" },
  { value: "16-20", label: "16-20" },
  { value: "Above 20", label: "Above 20" },
];

export const qualification = [
  { value: "", label: "" },
  { value: "SSLC", label: "SSLC" },
  { value: "<SSLC", label: "<SSLC" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post Graduate", label: "Post Graduate" },
];

export const otherDocument = [
  { value: "Aadhar", label: "Aadhar" },
  { value: "PAN", label: "PAN" },
];

export const options = [
  { value: "", label: "" },
  { value: "A/C TECHNICIAN", label: "A/C TECHNICIAN" },
  { value: "ADT OPERATOR", label: "ADT OPERATOR" },
  { value: "CNC OPERATOR", label: "CNC OPERATOR" },
  { value: "ECT - TECHNICIAN", label: "ECT - TECHNICIAN" },
  { value: "FABRICATOR", label: "FABRICATOR" },
  { value: "FIREWATCH", label: "FIREWATCH" },
  { value: "FITTER - MECHANICAL", label: "FITTER - MECHANICAL" },
  { value: "FITTER - PIPE", label: "FITTER - PIPE" },
  { value: "FOREMAN", label: "FOREMAN" },
  { value: "HELPER", label: "HELPER" },
  { value: "MANWAY WATCH", label: "MANWAY WATCH" },
  { value: "MECHANIC", label: "MECHANIC" },
  { value: "OPERATOR - CRANE", label: "OPERATOR - CRANE" },
  { value: "OPERATOR - VACUUM TRUCK", label: "OPERATOR - VACUUM TRUCK" },
  { value: "OPERATOR -BUNDLE PULLER", label: "OPERATOR -BUNDLE PULLER" },
  { value: "QA/QC - SENIOR ENGINEER", label: "QA/QC - SENIOR ENGINEER" },
  { value: "RIGGER- 3", label: "RIGGER- 3" },
  { value: "SUPERVISOR - HSE", label: "SUPERVISOR - HSE" },
  { value: "SUPERVISOR - SENIOR", label: "SUPERVISOR - SENIOR" },
  { value: "SUPERVISOR", label: "SUPERVISOR" },
  { value: "TECHNICIAN - MECHANICAL", label: "TECHNICIAN - MECHANICAL" },
  { value: "TECHNICIAN - BA/ N2", label: "TECHNICIAN - BA/ N2" },
  { value: "TECHNICIAN - CATALYST", label: "TECHNICIAN - CATALYST" },
  {
    value: "TECHNICIAN - CHEMICAL CLEANING",
    label: "TECHNICIAN - CHEMICAL CLEANING",
  },
  { value: "TECHNICIAN - FLARE", label: "TECHNICIAN - FLARE" },
  { value: "TECHNICIAN - HP", label: "TECHNICIAN - HP" },
  { value: "TECHNICIAN - LEAK REPAIR", label: "TECHNICIAN - LEAK REPAIR" },
  { value: "BOLTING TECHNICIAN- I", label: "BOLTING TECHNICIAN- I" },
  { value: "BOLTING TECHNICIAN- II", label: "BOLTING TECHNICIAN- II" },
  { value: "BOLTING TECHNICIAN- III", label: "BOLTING TECHNICIAN- III" },
  { value: "WELDER ALLOY", label: "WELDER ALLOY" },
  { value: "WELDER- CS", label: "WELDER- CS" },
  { value: "WELDER- SS", label: "WELDER- SS" },
  { value: "CAD OPERATOR", label: "CAD OPERATOR" },
  { value: "CO-ORDINATOR - EQUIPMENT", label: "CO-ORDINATOR - EQUIPMENT" },
  { value: "CO-ORDINATOR - MATERIAL", label: "CO-ORDINATOR - MATERIAL" },
  { value: "CO-ORDINATOR - TRANSPORT", label: "CO-ORDINATOR - TRANSPORT" },
  { value: "COST CONTROLLER", label: "COST CONTROLLER" },
  { value: "DRIVER - HD", label: "DRIVER - HD" },
  { value: "DRIVER - LD", label: "DRIVER - LD" },
  { value: "FLAGMAN", label: "FLAGMAN" },
  { value: "MALE NURSE", label: "MALE NURSE" },
  { value: "OPERATOR - FORK LIFT", label: "OPERATOR - FORK LIFT" },
  { value: "PERMIT RECEIVER", label: "PERMIT RECEIVER" },
  { value: "PLANNER", label: "PLANNER" },
  { value: "PLANNER - SENIOR", label: "PLANNER - SENIOR" },
  { value: "LEAD PLANNER", label: "LEAD PLANNER" },
  { value: "PRO", label: "PRO" },
  { value: "PROJECT CONTROL ENGINEER", label: "PROJECT CONTROL ENGINEER" },
  { value: "PROJECT CO-ORDINATOR", label: "PROJECT CO-ORDINATOR" },
  { value: "PROJECT LEADER", label: "PROJECT LEADER" },
  { value: "PROJECT MANAGER", label: "PROJECT MANAGER" },
  { value: "QA/QC - LEAD ENGINEER", label: "QA/QC - LEAD ENGINEER" },
  { value: "QA/QC ENGINEER", label: "QA/QC ENGINEER" },
  { value: "RIGGER- 1", label: "RIGGER- 1" },
  { value: "RIGGER- 2", label: "RIGGER- 2" },
  { value: "RIGGING - ENGINEER", label: "RIGGING - ENGINEER" },
  { value: "INSTRUMENT TECHNICIAN", label: "INSTRUMENT TECHNICIAN" },
  { value: "INSTRUMENTATION FOREMAN", label: "INSTRUMENTATION FOREMAN" },
  { value: "INSTRUMENTATION SUPERVISOR", label: "INSTRUMENTATION SUPERVISOR" },
  { value: "SCAFFOLDING COORDINATOR", label: "SCAFFOLDING COORDINATOR" },
  { value: "INSULATION COORDINATOR", label: "INSULATION COORDINATOR" },
  { value: "PAINTING COORDINATOR", label: "PAINTING COORDINATOR" },
  { value: "MATERIAL MARSHELLER", label: "MATERIAL MARSHELLER" },
  { value: "MECHANICAL SUPERVISOR", label: "MECHANICAL SUPERVISOR" },
  { value: "CIVIL SUPERVISOR", label: "CIVIL SUPERVISOR" },
  { value: "FABRICATOR", label: "FABRICATOR" },
  {
    value: "ABRASIVE BLASTER / PAINTER CERTIFIED",
    label: "ABRASIVE BLASTER / PAINTER CERTIFIED",
  },
  { value: "SCAFFOLDING INSPECTOR", label: "SCAFFOLDING INSPECTOR" },
  { value: "SCAFFOLDER", label: "SCAFFOLDER" },
  { value: "SHEET METAL WORKER", label: "SHEET METAL WORKER" },
  { value: "INSULATOR", label: "INSULATOR" },
  { value: "MACHINIST", label: "MACHINIST" },
  {
    value: "MACHINE OPERATOR (TURNING/MILLING/DRILLING/GRINDING/SHAPER)",
    label: "MACHINE OPERATOR (TURNING/MILLING/DRILLING/GRINDING/SHAPER)",
  },
  { value: "FOREMAN-CIVIL", label: "FOREMAN-CIVIL" },
  { value: "MASON", label: "MASON" },
  { value: "CARPENTER", label: "CARPENTER" },
  {
    value: "AIR CONDITIONING MONITORING UNIT TECHNICIAN",
    label: "AIR CONDITIONING MONITORING UNIT TECHNICIAN",
  },
  { value: "SCAFFOLDING SUPERVISOR", label: "SCAFFOLDING SUPERVISOR" },
  { value: "SCAFFOLDING FOREMAN", label: "SCAFFOLDING FOREMAN" },
  { value: "PIPING SUPERVISOR", label: "PIPING SUPERVISOR" },
  { value: "SAFETY OFFICER", label: "SAFETY OFFICER" },
  { value: "STORE KEEPER", label: "STORE KEEPER" },
  { value: "TECHNICIAN - ELECTRICIAN", label: "TECHNICIAN - ELECTRICIAN" },
  { value: "ESTIMATOR", label: "ESTIMATOR" },
  { value: "SR ESTIMATOR", label: "SR ESTIMATOR" },
  { value: "LEAD ESTIMATOR", label: "LEAD ESTIMATOR" },
  { value: "PROJECT LEADER", label: "PROJECT LEADER" },
  { value: "SR PROJECT LEADER", label: "SR PROJECT LEADER" },
  { value: "PROJECT MANAGER", label: "PROJECT MANAGER" },
  { value: "SR PROJECT MANAGER", label: "SR PROJECT MANAGER" },
  { value: "AREA LEADER", label: "AREA LEADER" },
  { value: "ACCOUNTANT", label: "ACCOUNTANT" },
  { value: "SR ACCOUNTANT", label: "SR ACCOUNTANT" },
  { value: "CHIEF ACCOUNTANT", label: "CHIEF ACCOUNTANT" },
  { value: "OFFICE CLERK", label: "OFFICE CLERK" },
  { value: "SECRETARY", label: "SECRETARY" },
  { value: "PROCUREMENT ENGINEER", label: "PROCUREMENT ENGINEER" },
  { value: "SR PROCUREMENT ENGINEER", label: "SR PROCUREMENT ENGINEER" },
  { value: "CONTRACTS ENGINEER", label: "CONTRACTS ENGINEER" },
  { value: "TIME KEEPER", label: "TIME KEEPER" },
];

export const headers = [
  {
    id: "index",
    label: "Index",
  },
  {
    id: "first name",
    label: "First Name",
  },
  {
    id: "last name",
    label: "Last Name",
  },
  {
    id: "phone",
    label: "Phone Number",
  },
  {
    id: "email",
    label: "Email",
  },
];

export const pdfHeaders = [
  {
    id: "index",
    label: "Index",
  },
  {
    id: "first_name",
    label: "First Name",
  },
  {
    id: "last_name",
    label: "Last Name",
  },
  {
    id: "phone",
    label: "Phone Number",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "imagee",
    label: "Image",

  },
];
