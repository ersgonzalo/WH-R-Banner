# WH-R-Banner
A "simple and minimalist" Fitbit watchface with colors of Black, White, and Dark Red. In my personal taste, I've seen too many watch faces that come off as strong or too tacky, so I decided to make one for myself.

![WH-R Default.PNG](https://github.com/ersgonzalo/WH-R-Banner/blob/master/images/WH-R%20Default.PNG)      ![WH-R Low Battery](https://raw.githubusercontent.com/ersgonzalo/WH-R-Banner/master/images/WH-R%20Low%20Battery.png)

Still learning how to do these things, and need to get way better at HTML+CSS designing and Fitbit's Device APIs setup.

If you'd like to install the watchface for yourself, you can use the [gallery link here](https://gam.fitbit.com/gallery/clock/54750558-52f6-49c5-9d0d-8f1ffa509a6d)!

### Version Changelog  
#### 1.9.0 - 9/29/19  
- Date formatting for long `Day Of Week, Month Date` combinations so text is no longer cut off from view
- Change from `mins active` to `minutes` in box since the icon is fairly informative enough
- Add in some testing functions so my life is easier for potenital formatting

#### 1.8.0 - 7/9/19  
- Add seconds to the bottom right for timing
- Add a Battery Percentage display when clicking on battery icon
- Insanity late night refactoring...

#### 1.7.1 - 7/6/19  
- Forgot to use colons on an object in battery.js file...

#### 1.7 - 7/5/19  
- Handle User Stats if they display as undefined
- Add in recognition for when device is off of a user's wrist when charging
- not-really-refactoring, I'm bad at logic sometimes...
- Red Shadow Outline for better color distinguishing
- Changed Clock Font out of Taste

#### 1.6 - 1/2/19  
- Adjust battery icon tolerances for less stressful charge induction
- Add in recognition for when device is off of a user's wrist
- Add in animation for Heartrate Bar when Default fitbit battery moves onto top left area

#### 1.5 - 1/2/19  
- Added a simple indicator for battery life above date divider on the middle left area
- Move the top Heartrate bar when battery life indictor from Fitbit appears around 17%

#### 1.1 - 12/31/18
- Add in a new White Bar section for Active Minutes from the User
- Increase overall size of elements displayed on the watch face because they were too small to glance at previously.

#### 1.0 - 12/30/18
- Created a Fitbit Versa watch face for the first time!

### ToDos For Later:
- Add in animation when clicking watch face (maybe to display user goals and get overall battery %?)
- Add in Goal % compared to specific white bar lengths
- Make refresh less taxing on application/rendering
- ~Handle any undefined errors if networking stuff goes down like on 7/2/19~
- ~Hide Battery display if device is charging state and do not trigger animation~
- ~~Add in animation when top bpm bar moves~~
- ~~Make the text larger more areas proportionately~~

### Stretch Goals:
- Display better on Ionic Devices
- More code modularity for various sections

### Credits:
- Fitbit Team's Design Assets - https://github.com/Fitbit/sdk-design-assets
- Font Awesome for their Battery Icons - https://github.com/FortAwesome/Font-Awesome
