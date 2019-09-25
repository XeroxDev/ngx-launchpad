import Launchpad from 'launchpad-webmidi/launchpad-webmidi.js';
import {ColorsInterface} from '../interfaces/colors-interface';


export class Colors {
  private readonly colorRed;
  private readonly colorGreen;
  private readonly colorAmber;
  private readonly colorOff;
  private readonly colorYellow;

  constructor(pad: Launchpad) {
    this.colorRed = pad.red;
    this.colorGreen = pad.green;
    this.colorAmber = pad.amber;
    this.colorOff = pad.off;
    this.colorYellow = pad.yellow;
  }


  get red(): ColorsInterface {
    return this.colorRed;
  }

  get green(): ColorsInterface {
    return this.colorGreen;
  }

  get amber(): ColorsInterface {
    return this.colorAmber;
  }

  get off(): ColorsInterface {
    return this.colorOff;
  }

  get yellow(): ColorsInterface {
    return this.colorYellow;
  }
}
