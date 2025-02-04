import {Component} from '@angular/core';
import jsPDF from "jspdf";

@Component({
  selector: 'app-invoice',
  imports: [],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {

  generateInvoice() {
    const doc = new jsPDF()
    doc.text("Faktúra pre Pala", 10, 10);
    doc.text("10 eur za to, že sa s nim musim kamosit", 10, 20);
    doc.save();


  }
}
