import axios from "axios";
import { ExportToCsv } from "export-to-csv";
import { toast } from "react-toastify";
import { headers, MainURL } from "../../variables/constants";

// export csv function
export const exportCsv = () => {
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    filename: "crud-report",
    headers: headers.map((c) => c.label),
  };
  const csvExporter = new ExportToCsv(csvOptions);
  const userToken = localStorage.getItem("user-info");

  axios({
    url: `${MainURL}/list_profile`,
    method: "get",
    headers: {
      autherization: userToken,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      const filteredCsv = response.data.responseData.map(
        ({ id, image, ...empDataChange }) => empDataChange
      );
      return csvExporter.generateCsv(filteredCsv);
    })
    .catch((err) => {
      return toast.warn(err);
    });
};
