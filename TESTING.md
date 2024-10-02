# Testing

> [!NOTE]  
> Return back to the [README.md](README.md) file.

## Manual Testing

I tested the following features of the deployed website in a manual testing process:

| Feature | Expectation | Action | Outcome |
| --- | --- | --- | --- |
| **Logo** | When clicked the home page will open | Click the logo | Home page opened when clicked |
| **Home navbar button** | When clicked the home page will open | Click the Home navbar button | Home page opened when clicked |
| **Upcoming navbar button** | When clicked the upcoming talks page will open | Click the Upcoming navbar button | Upcoming talks page opened when clicked |

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
|  | [index.html](https://theresaabl.github.io/sliding-puzzle/index.html) | ![screenshot](documentation/validation/html-index.png) | On first validation there was a number of errors, which were easily fixed. ![screenshot](documentation/validation/html-index-errors.png) |
|  | [404.html](https://theresaabl.github.io/sliding-puzzle/404.html) | ![screenshot](documentation/validation/html-404.png) | Upon first validation there was an error which was easily fixed. ![screenshot](documentation/validation/html-404-error.png) |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate my CSS file.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
| assets/css | [style.css](https://jigsaw.w3.org/css-validator/validator?uri=https://theresaabl.github.io/sliding-puzzle) | ![screenshot](documentation/validation/css.png) | |

### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
| assets/js | script.js | ![screenshot](documentation/validation/js-index.png) | On first validation there was a number of minor errors, which were easily fixed. ![screenshot](documentation/validation/js-index.png) |
| assets/js | script-404.js | ![screenshot](documentation/validation/js-404.png) | |

## Browser Compatibility

I have tested my deployed project on multiple browsers to check for compatibility issues. The browsers I have tested on are:
- [Chrome](https://www.google.com/chrome)
- [Firefox](https://www.mozilla.org/firefox)
- [Edge](https://www.microsoft.com/edge)

| Browser | Landing modal | Main game | Win message | New game modal | Leaderboard | Rules | 404 page | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | -- |
| Chrome | ![screenshot](documentation/browsers/browser-chrome-landing.png) | ![screenshot](documentation/browsers/browser-chrome-main-game.png) |![screenshot](documentation/browsers/browser-chrome-win-message.png) | ![screenshot](documentation/browsers/browser-chrome-new-game.png) | ![screenshot](documentation/browsers/browser-chrome-leaderboard.png) | ![screenshot](documentation/browsers/browser-chrome-rules.png)  | ![screenshot](documentation/browsers/browser-chrome-404.png) |  Works as expected |
| Firefox | ![screenshot](documentation/browsers/browser-firefox-landing.png) | ![screenshot](documentation/browsers/browser-firefox-main-game.png) |![screenshot](documentation/browsers/browser-firefox-win-message.png) | ![screenshot](documentation/browsers/browser-firefox-new-game.png) | ![screenshot](documentation/browsers/browser-firefox-leaderboard.png) | ![screenshot](documentation/browsers/browser-firefox-rules.png)  | ![screenshot](documentation/browsers/browser-firefox-404.png) |  There is a bug showing up in Firefox, when clicking on the select elements in the new game or win modals, the modal closes immediately without letting the user select an option. The select element can however be accessed via keyboard. I found some helpful answers on [Stackoverflow](https://stackoverflow.com/questions/77402658/why-does-clicking-a-select-dropdown-inside-a-form-embedded-in-a-modal-dialog-clo) which lead to the conclusion, that this issue comes the function that handles when a user clicks outside the modal. In other browsers clicking outside the modal closes it, however in Firefox clicking on a select element returns  e.clientX and e.clientY of 0, which leads to the modal closing. A quick solution would be to leave this functionality out as the user can close the modal by clicking the close button and pressing the escape key. However, for the purpose of this release I decided to leave this functionality in, and Firefox users can control the select elements via keyboard. |
| Edge | ![screenshot](documentation/browsers/browser-edge-landing.png) | ![screenshot](documentation/browsers/browser-edge-main-game.png) |![screenshot](documentation/browsers/browser-edge-win-message.png) | ![screenshot](documentation/browsers/browser-edge-new-game.png) | ![screenshot](documentation/browsers/browser-edge-leaderboard.png) | ![screenshot](documentation/browsers/browser-edge-rules.png)  | ![screenshot](documentation/browsers/browser-edge-404.png) |  Works as expected |

## Responsiveness

I have tested my deployed project on multiple devices to check for responsiveness issues. I first tested many different device sizes in Chrome DevTools and then tested the site on different physical devices. The screenshots below are from the real devices.

| Device | Landing modal | Main game | Win message | New game modal | Leaderboard | Rules | 404 page | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Samsung Galaxy A41 (Mobile) | ![screenshot](documentation/responsiveness/responsiveness-galaxy-landing.jpg) | ![screenshot](documentation/responsiveness/responsiveness-galaxy-main-game.jpg) | ![screenshot](documentation/responsiveness/responsiveness-galaxy-win-message.jpg) | ![screenshot](documentation/responsiveness/responsiveness-galaxy-new-game.jpg) | ![screenshot](documentation/responsiveness/responsiveness-galaxy-leaderboard.jpg) | ![screenshot](documentation/responsiveness/responsiveness-galaxy-rules.jpg) | ![screenshot](documentation/responsiveness/responsiveness-galaxy-error.jpg) | Works as expected |
| Galaxy Tab S6 Lite (Tablet) | ![screenshot](documentation/responsiveness/responsiveness-tab-s6-landing.jpg) | ![screenshot](documentation/responsiveness/responsiveness-tab-s6-main-game.jpg) | ![screenshot](documentation/responsiveness/responsiveness-tab-s6-win-message.jpg) | ![screenshot](documentation/responsiveness/responsiveness-tab-s6-new-game.jpg) | ![screenshot](documentation/responsiveness/responsiveness-tab-s6-leaderboard.jpg) | ![screenshot](documentation/responsiveness/responsiveness-tab-s6-rules.jpg) | ![screenshot](documentation/responsiveness/responsiveness-tab-s6-error.jpg) | Works as expected |
| Lenovo X1 Extreme (Laptop) | ![screenshot](documentation/responsiveness/responsiveness-lenovo-landing.png) | ![screenshot](documentation/responsiveness/responsiveness-lenovo-main-game.png) | ![screenshot](documentation/responsiveness/responsiveness-lenovo-win-message.png) | ![screenshot](documentation/responsiveness/responsiveness-lenovo-new-game.png) | ![screenshot](documentation/responsiveness/responsiveness-lenovo-leaderboard.png) | ![screenshot](documentation/responsiveness/responsiveness-lenovo-rules.png) | ![screenshot](documentation/responsiveness/responsiveness-lenovo-error.png) | Works as expected |
| Lenovo ThinkVision P24h-10 (Monitor) | ![screenshot](documentation/responsiveness/responsiveness-thinkvision-landing.png) | ![screenshot](documentation/responsiveness/responsiveness-thinkvision-main-game.png) | ![screenshot](documentation/responsiveness/responsiveness-thinkvision-win-message.png) | ![screenshot](documentation/responsiveness/responsiveness-thinkvision-new-game.png) | ![screenshot](documentation/responsiveness/responsiveness-thinkvision-leaderboard.png) | ![screenshot](documentation/responsiveness/responsiveness-thinkvision-rules.png) | ![screenshot](documentation/responsiveness/responsiveness-thinkvision-error.png) | Works as expected |

## Lighthouse Audit

I have tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Main page | ![screenshot](documentation/lighthouse/lighthouse-mobile-index.png) | ![screenshot](documentation/lighthouse/lighthouse-desktop-index.png) | Some minor warnings |
| error 404 page | ![screenshot](documentation/lighthouse/lighthouse-mobile-404.png) | ![screenshot](documentation/lighthouse/lighthouse-desktop-404.png) | Some minor warnings |

## Defensive Programming

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

Defensive programming (defensive design) is extremely important!

When building projects that accept user inputs or forms, you should always test the level of security for each.
Examples of this could include (not limited to):

Forms:
- Users cannot submit an empty form
- Users must enter valid email addresses

PP3 (Python-only):
- Users must enter a valid letter/word/string when prompted
- Users must choose from a specific list only

MS3 (Flask) | MS4/PP4/PP5 (Django):
- Users cannot brute-force a URL to navigate to a restricted page
- Users cannot perform CRUD functionality while logged-out
- User-A should not be able to manipulate data belonging to User-B, or vice versa
- Non-Authenticated users should not be able to access pages that require authentication
- Standard users should not be able to access pages intended for superusers

You'll want to test all functionality on your application, whether it's a standard form,
or uses CRUD functionality for data manipulation on a database.
Make sure to include the `required` attribute on any form-fields that should be mandatory.
Try to access various pages on your site as different user types (User-A, User-B, guest user, admin, superuser).

You should include any manual tests performed, and the expected results/outcome.

Testing should be replicable.
Ideally, tests cases should focus on each individual section of every page on the website.
Each test case should be specific, objective, and step-wise replicable.

Instead of adding a general overview saying that everything works fine,
consider documenting tests on each element of the page
(ie. button clicks, input box validation, navigation links, etc.) by testing them in their happy flow,
and also the bad/exception flow, mentioning the expected and observed results,
and drawing a parallel between them where applicable.

Consider using the following format for manual test cases:

Expected Outcome / Test Performed / Result Received / Fixes Implemented

- **Expected**: "Feature is expected to do X when the user does Y."
- **Testing**: "Tested the feature by doing Y."
- (either) **Result**: "The feature behaved as expected, and it did Y."
- (or) **Result**: "The feature did not respond to A, B, or C."
- **Fix**: "I did Z to the code because something was missing."

Use the table below as a basic start, and expand on it using the logic above.

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

Defensive programming was manually tested with the below user acceptance testing:

| Page | Expectation | Test | Result | Fix | Screenshot |
| --- | --- | --- | --- | --- | --- |
| Home | | | | | |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature behaved as expected, and it did Y | Test concluded and passed | ![screenshot](documentation/features/feature01.png) |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature did not respond to A, B, or C. | I did Z to the code because something was missing | ![screenshot](documentation/features/feature02.png) |
| About | | | | | |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature behaved as expected, and it did Y | Test concluded and passed | ![screenshot](documentation/features/feature03.png) |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature did not respond to A, B, or C. | I did Z to the code because something was missing | ![screenshot](documentation/features/feature04.png) |
| Gallery | | | | | |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature behaved as expected, and it did Y | Test concluded and passed | ![screenshot](documentation/features/feature05.png) |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature did not respond to A, B, or C. | I did Z to the code because something was missing | ![screenshot](documentation/features/feature06.png) |
| Contact | | | | | |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature behaved as expected, and it did Y | Test concluded and passed | ![screenshot](documentation/features/feature07.png) |
| | Feature is expected to do X when the user does Y | Tested the feature by doing Y | The feature did not respond to A, B, or C. | I did Z to the code because something was missing | ![screenshot](documentation/features/feature08.png) |
| repeat for all remaining pages | x | x | x | x | x |

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

Another way of performing defensive testing is a simple Pass/Fail for each test.
The assessors prefer the above method, with the full test explained, but this is also acceptable in most cases.

When in doubt, use the above method instead, and delete the table below.

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

| Page | User Action | Expected Result | Pass/Fail | Comments |
| --- | --- | --- | --- | --- |
| Home | | | | |
| | Click on Logo | Redirection to Home page | Pass | |
| | Click on Home link in navbar | Redirection to Home page | Pass | |
| Gallery | | | | |
| | Click on Gallery link in navbar | Redirection to Gallery page | Pass | |
| | Load gallery images | All images load as expected | Pass | |
| Contact | | | | |
| | Click on Contact link in navbar | Redirection to Contact page | Pass | |
| | Enter first/last name | Field will accept freeform text | Pass | |
| | Enter valid email address | Field will only accept email address format | Pass | |
| | Enter message in textarea | Field will accept freeform text | Pass | |
| | Click the Submit button | Redirects user to form-dump | Pass | User must click 'Back' button to return |
| Sign Up | | | | |
| | Click on Sign Up button | Redirection to Sign Up page | Pass | |
| | Enter valid email address | Field will only accept email address format | Pass | |
| | Enter valid password (twice) | Field will only accept password format | Pass | |
| | Click on Sign Up button | Asks user to confirm email page | Pass | Email sent to user |
| | Confirm email | Redirects user to blank Sign In page | Pass | |
| Log In | | | | |
| | Click on the Login link | Redirection to Login page | Pass | |
| | Enter valid email address | Field will only accept email address format | Pass | |
| | Enter valid password | Field will only accept password format | Pass | |
| | Click Login button | Redirects user to home page | Pass | |
| Log Out | | | | |
| | Click Logout button | Redirects user to logout page | Pass | Confirms logout first |
| | Click Confirm Logout button | Redirects user to home page | Pass | |
| Profile | | | | |
| | Click on Profile button | User will be redirected to the Profile page | Pass | |
| | Click on the Edit button | User will be redirected to the edit profile page | Pass | |
| | Click on the My Orders link | User will be redirected to the My Orders page | Pass | |
| | Brute forcing the URL to get to another user's profile | User should be given an error | Pass | Redirects user back to own profile |
| repeat for all remaining pages | x | x | x | x |

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

Repeat for all other tests, as applicable to your own site.
The aforementioned tests are just an example of a few different project scenarios.

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

## User Story Testing

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

Testing user stories is actually quite simple, once you've already got the stories defined on your README.

Most of your project's **features** should already align with the **user stories**,
so this should as simple as creating a table with the user story, matching with the re-used screenshot
from the respective feature.

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

| User Story | Screenshot |
| --- | --- |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature01.png) |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature02.png) |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature03.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature04.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature05.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature06.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/features/feature07.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/features/feature08.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/features/feature09.png) |
| repeat for all remaining user stories | x |

## Bugs

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

This section is primarily used for JavaScript and Python applications,
but feel free to use this section to document any HTML/CSS bugs you might run into.

It's very important to document any bugs you've discovered while developing the project.
Make sure to include any necessary steps you've implemented to fix the bug(s) as well.

**PRO TIP**: screenshots of bugs are extremely helpful, and go a long way!

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

- JS Uncaught ReferenceError: `foobar` is undefined/not defined

    ![screenshot](documentation/bugs/bug01.png)

    - To fix this, I _____________________.

- JS `'let'` or `'const'` or `'template literal syntax'` or `'arrow function syntax (=>)'` is available in ES6 (use `'esversion: 11'`) or Mozilla JS extensions (use moz).

    ![screenshot](documentation/bugs/bug02.png)

    - To fix this, I _____________________.

- Python `'ModuleNotFoundError'` when trying to import module from imported package

    ![screenshot](documentation/bugs/bug03.png)

    - To fix this, I _____________________.

- Django `TemplateDoesNotExist` at /appname/path appname/template_name.html

    ![screenshot](documentation/bugs/bug04.png)

    - To fix this, I _____________________.

- Python `E501 line too long` (93 > 79 characters)

    ![screenshot](documentation/bugs/bug04.png)

    - To fix this, I _____________________.

## Unfixed Bugs

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

You will need to mention unfixed bugs and why they were not fixed.
This section should include shortcomings of the frameworks or technologies used.
Although time can be a big variable to consider, paucity of time and difficulty understanding
implementation is not a valid reason to leave bugs unfixed.

If you've identified any unfixed bugs, no matter how small, be sure to list them here.
It's better to be honest and list them, because if it's not documented and an assessor finds the issue,
they need to know whether or not you're aware of them as well, and why you've not corrected/fixed them.

Some examples:

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

- On devices smaller than 375px, the page starts to have `overflow-x` scrolling.

    ![screenshot](documentation/bugs/unfixed-bug01.png)

    - Attempted fix: I tried to add additional media queries to handle this, but things started becoming too small to read.

- For PP3, when using a helper `clear()` function, any text above the height of the terminal does not clear, and remains when you scroll up.

    ![screenshot](documentation/bugs/unfixed-bug02.png)

    - Attempted fix: I tried to adjust the terminal size, but it only resizes the actual terminal, not the allowable area for text.

- When validating HTML with a semantic `section` element, the validator warns about lacking a header `h2-h6`. This is acceptable.

    ![screenshot](documentation/bugs/unfixed-bug03.png)

    - Attempted fix: this is a known warning and acceptable, and my section doesn't require a header since it's dynamically added via JS.

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

If you legitimately cannot find any unfixed bugs or warnings, then use the following sentence:

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

> [!NOTE]  
> There are no remaining bugs that I am aware of.
