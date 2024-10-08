import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quote-form-dialog',
  templateUrl: './quote-form-dialog.component.html',
  styleUrls: ['./quote-form-dialog.component.css']
})
export class QuoteFormDialogComponent {
  imgSrc: string | undefined;
  color: string | undefined;
  headline: string | undefined;
  quoteText: string | undefined;
  author: string | undefined;
  isDark: boolean | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imgSrc = data.imgSrc;
    this.color = data.color;
    this.headline = data.headline;
    this.quoteText = data.quoteText;
    this.author = data.author ? `- ${data.author} -` : "";
    this.isDark = true;
  }

  toggleMode() {
    this.isDark = !this.isDark;
  }

  createPNG() {
    // Get the preview dialog
    let display = document.getElementById('motivCanvas');
    if (!display) return;

    // create a canvas (screenshot)
    html2canvas(display, { useCORS: true }).then(function (canvas) {
      let link = document.getElementById('link');
      if (!link) return;

      // convert the canvas to a png and create a download link
      link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
    });
  }
}
