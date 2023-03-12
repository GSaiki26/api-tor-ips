// Types
type Ip = {
  id: number;
  ip: string;
  createdAt: string;
  updatedAt: string;
};

// Classes
class IpsController {
  /**
   * A method to hide some ip.
   */
  public static async hideIp() {
    const ipInput = document.getElementById("input-ip") as HTMLInputElement;

    try {
      await fetch(`/ip/${ipInput.value.trim()}`, {
        method: "DELETE",
      });
    } catch (err) {
      return alert("Não foi possivel ocultar o ip.");
    }
    alert("O ip foi ocultado com sucesso.");
  }

  /**
   * A method to get the ip list.
   */
  public static async getIpsList() {
    document.getElementById("img-loading")!.hidden = false;
    const ipsResult = await (await fetch("/ip")).json();
    document.getElementById("img-loading")!.hidden = true;
    this.writeResults(ipsResult.data);
  }

  /**
   * A method to get all the ip list.
   */
  public static async getAllIpsList() {
    document.getElementById("img-loading")!.hidden = false;
    const ipsResult = await (await fetch("/ip/all")).json();
    document.getElementById("img-loading")!.hidden = true;
    this.writeResults(ipsResult.data);
  }

  private static writeResults(ipResults: any[]): void {
    // Write the ip results list into the table.
    const tableBody = document.getElementById("tbody-ip-list")!;
    tableBody.innerHTML = "";

    // Sort the results.
    ipResults.sort((ipA, ipB) => ipA.id - ipB.id);

    // Loop through the ips result and create a line to every ip.
    ipResults.forEach((ip: Ip) => {
      const row = this.createLine(ip);
      tableBody.appendChild(row);
    });
  }

  /**
   * A method to create the table's line.
   */
  private static createLine(ip: Ip): HTMLTableRowElement {
    // Create the line.
    const tr = document.createElement("tr");
    const id = document.createElement("th");
    id.scope = "row";
    id.textContent = ip.id.toString();

    // Append to the line
    tr.appendChild(id);
    tr.appendChild(this.createCell(ip.ip));
    tr.appendChild(this.createCell(new Date(ip.createdAt)));
    tr.appendChild(this.createCell(new Date(ip.updatedAt).toDateString()));

    return tr;
  }

  /**
   * A method to create a table cell using some value.
   */
  private static createCell(field: any): HTMLTableCellElement {
    const td = document.createElement("td");
    td.textContent = field;
    return td;
  }
}
