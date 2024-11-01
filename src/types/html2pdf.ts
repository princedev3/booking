declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number;
      filename?: string;
      image?: { type: string; quality: number };
      html2canvas?: object;
      jsPDF?: { unit: string; format: string; orientation: string };
    }
  
    interface Html2Pdf {
      from(element: HTMLElement): this;
      set(options: Html2PdfOptions): this;
      save(): Promise<void>;
      toPdf(): Promise<any>;
    }
  
    function html2pdf(): Html2Pdf;
  
    export default html2pdf;
  }