import {Component, OnInit} from '@angular/core';
import {NgxLaunchpadService} from '../../../ngx-launchpad/src/lib/ngx-launchpad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rows: { row: number, col: number; color?: string }[][] = [];

  constructor(private launchpadService: NgxLaunchpadService) {
    this.rows[0] = [];
    for (let i = 0; i <= 7; i++) {
      this.rows[0].push({row: 8, col: i});
    }

    for (let row = 1; row <= 8; row++) {
      this.rows[row] = [];
      for (let col = 0; col <= 8; col++) {
        this.rows[row].push({row: row - 1, col});
      }
    }
  }

  async ngOnInit() {
    await this.launchpadService.connect(true);
    this.launchpadService.onKey().subscribe((k) => {
      console.log(this.launchpadService.getPressedButtons());
      if (k.pressed) {
        const key = document.getElementById(`key-${k.y}-${k.x}`);
        key.style.backgroundColor = 'yellow';
        setTimeout(() => {
          key.style.backgroundColor = '';
        }, 2000);
      }
    });
  }

  colorPad(row: number, col: number) {
    this.launchpadService.col(this.launchpadService.Colors.red, [col, row]);
    setTimeout(() => {
      this.launchpadService.col(this.launchpadService.Colors.off, [col, row]);
    }, 2000);
  }
}
