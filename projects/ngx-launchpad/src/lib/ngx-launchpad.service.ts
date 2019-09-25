import {Injectable} from '@angular/core';
import Launchpad from 'launchpad-webmidi/launchpad-webmidi.js';
import {Colors} from './classes/colors';
import {ColorsInterface} from './interfaces/colors-interface';
import {Observable, Subject} from 'rxjs';
import {OnKeyInterface} from './interfaces/on-key-interface';

@Injectable({
  providedIn: 'root'
})
export class NgxLaunchpadService {
  private launchpad: Launchpad;
  private colors: Colors;
  private $onConnect: Subject<void> = new Subject<void>();
  private $onDisconnect: Subject<void> = new Subject<void>();
  private $onKey: Subject<OnKeyInterface> = new Subject<OnKeyInterface>();

  private initializeListener() {
    this.launchpad.on('connect', () => this.$onConnect.next());
    this.launchpad.on('disconnect', () => this.$onDisconnect.next());
    this.launchpad.on('key', key => this.$onKey.next({x: key.x, y: key.y, pressed: key.pressed}));
  }

  constructor() {
  }

  public async connect(reset: boolean = true) {
    this.launchpad = new Launchpad();
    await this.launchpad.connect();
    if (reset) {
      this.launchpad.reset();
    }

    this.colors = new Colors(this.launchpad);
    this.initializeListener();
  }

  public async disconnect() {
    return this.launchpad.disconnect();
  }

  public col(color: number | ColorsInterface, buttons: number[] | number[][]): Promise<boolean | any> {
    return this.launchpad.col(color, buttons);
  }

  public setColors(buttonsWithColor: [][]): Promise<boolean | any> {
    return this.launchpad.setColors(buttonsWithColor);
  }

  public setSingleButtonColor(xy: [], color: ColorsInterface | number): Promise<boolean | any> {
    return this.launchpad.setSingleButtonColor(xy, color);
  }

  public onConnect(): Observable<void> {
    return this.$onConnect.asObservable();
  }

  public onDisconnect(): Observable<void> {
    return this.$onDisconnect.asObservable();
  }

  public onKey(): Observable<OnKeyInterface> {
    return this.$onKey.asObservable();
  }

  get Colors(): Colors {
    return this.colors;
  }

  getWriteBuffer() {
    return this.launchpad.writeBuffer;
  }

  getDisplayBuffer() {
    return this.launchpad.displayBuffer;
  }

  /**
   * Select the buffer to which LED colors are written. Default buffer of an unconfigured Launchpad is 0.
   */
  setWriteBuffer(bufferNumber: number) {
    this.launchpad.writeBuffer = bufferNumber;
  }

  /**
   * Select which buffer the Launchpad uses for the LED button colors. Default is 0.
   * Also disables flashing.
   */
  setDisplayBuffer(bufferNumber: number) {
    this.launchpad.displayBuffer = bufferNumber;
  }

  /**
   * Enable flashing. This essentially tells Launchpad to alternate the display buffer
   * at a pre-defined speed.
   */
  setFlash(flash: boolean) {
    this.launchpad.flash = flash;
  }

  setBuffers(args: { write: number; display: number; copyToDisplay: boolean; flash: boolean }) {
    this.launchpad.setBuffers(args);
  }

  /**
   * Set the low/medium button brightness. Low brightness buttons are about `num/den` times as bright
   * as full brightness buttons. Medium brightness buttons are twice as bright as low brightness.
   * @param num Numerator, between 1 and 16, default=1
   * @param den Denominator, between 3 and 18, default=5
   */
  multiplexing(num: number, den: number) {
    this.launchpad.multiplexing(num, den);
  }

  /**
   * Set the button brightness for buttons with non-full brightness.
   * Lower brightness increases contrast since the full-brightness buttons will not change.
   *
   * @param brightness Brightness between 0 (dark) and 1 (bright)
   */
  brightness(brightness: number) {
    this.launchpad.brightness(brightness);
  }

  /**
   * Generate an array of coordinate pairs from a string “painting”. The input string is 9×9 characters big
   * and starts with the first button row (including the scene buttons on the right). The last row is for the
   * Automap buttons which are in reality on top on the Launchpad.
   *
   * Any character which is a lowercase 'x' will be returned in the coordinate array.
   *
   * The generated array can be used for setting button colours, for example.
   *
   * @returns Array containing [x,y] coordinate pairs.
   */
  fromMap(map: string): number[][] {
    return this.launchpad.fromMap(map);
  }

  /**
   * Converts a string describing a row or column to button coordinates.
   * @param pattern String pattern, or array of string patterns.
   * String format is 'mod:pattern', with *mod* being one of rN (row N, e.g. r4), cN (column N), am (Automap), sc (Scene).
   * *pattern* are buttons from 0 to 8, where an 'x' or 'X' marks the button as selected,
   * and any other character is ignored; for example: 'x..xx' or 'X  XX'.
   */
  fromPattern(pattern: string | string[]) {
    return this.launchpad.fromPattern(pattern);
  }

  /**
   * Check if a button is pressed.
   * @param button [x,y] coordinates of the button to test
   */
  isPressed(button: number[]): boolean {
    return this.launchpad.isPressed(button);
  }

  /**
   * Get a list of buttons which are currently pressed.
   * @returns Array containing [x,y] pairs of pressed buttons
   */
  getPressedButtons(): number[][] {
    return this.launchpad.pressedButtons;
  }

  /**
   * Reset mapping mode, buffer settings, and duty cycle. Also turn all LEDs on or off.
   *
   * @param brightness If given, all LEDs will be set to the brightness level (1 = low, 3 = high).
   * If undefined (or any other number), all LEDs will be turned off.
   */
  reset(brightness: number) {
    this.launchpad.reset(brightness);
  }

  sendRaw(data) {
    this.launchpad.sendRaw(data);
  }
}
