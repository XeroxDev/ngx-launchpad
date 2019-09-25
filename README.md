# NGXLaunchpad
A small library for [angular 8](http://angular.io) to communicate with a Novation Launchpad. 

This library uses the [Launchpad WebMIDI](https://github.com/LostInBrittany/launchpad-webmidi) library. Shoutout to
 [LostInBrittany](https://github.com/LostInBrittany) for his really nice work! Without his work, my work would be
  even harder ;) Don't forget to give him a star
  ♥.

## Installation

- Install via [`npm`](https://www.npmjs.com/):

```bash
npm install --save ngx-launchpad
```

## Usage
Implement the ``NgxLaunchpadModule`` into your module like this:
```typescript
import {NgxLaunchpadModule} from '../../../ngx-launchpad/src/lib/ngx-launchpad.module';

@NgModule({
  declarations: [MyComponent],
  imports: [
    BrowserModule,
    NgxLaunchpadModule // <-- include it in your app module
  ],
  bootstrap: [MyComponent]
})
```
and then, you can import the ``NgxLaunchpadService`` into every component like this:
```typescript
constructor(private launchpadService: NgxLaunchpadService) {
}
```

### Small overview
#### Important or interesting functions
```typescript
pad.connect(); // <-- Connecting with Launchpad
pad.disconnect() // <-- Disconnection from Launchpad
pad.onConnect().subscribe(() => console.log('connected')); // <-- Listen to the connect event
pad.onDisconnect().subscribe(() => console.log('disconnected')); // <-- Listen to the disconnect event
pad.onKey().subscribe(key => console.log( `Key ${key.x},${key.y} down: ${key.pressed}`)); // <-- Listen to the key
 pressed / released event
pad.col(pad.Colors.red, [0, 0]); // <-- Color a key
```
#### Colors
```
pad.Colors.red;
pad.Colors.green;
pad.Colors.yellow;
pad.Colors.amber;
pad.Colors.off;
pad.Colors.red.medium;
pad.Colors.red.low;
pad.Colors.red.full; // Default strength
```
And much, much more

## License

[MIT License](http://opensource.org/licenses/MIT)
