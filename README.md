**Description**

This project was completed as part of General Assembly’s Software Engineering course - Unit 1 (week 3). The project is a browser based recreation of the classic board game ‘Battleships’. The game implements a turn-based system starting with the user and computer deciding where to place their ships. The user and computer then take turns picking tiles that might contain an enemy ship until all ships have been sunk. The project was built using HTML5, CSS3, and JavaScript ES6.

**Deployment link**

The project can be played here.
(https://fing1499.github.io/Battleships-Browser-Game/)

**Code Installation**

To access the code, follow the steps below:

1. Clone the repository from GitHub.
2. Open the project in your preferred code editor.
3. Open the index.html file in your browser.
4. The game will now be ready to play.

**Timeframe & Working Team**

The project was to be completed within a week-long timeframe, starting on the 8th of May 2023. The project was completed individually, from conception to completion.

Technologies Used

This project included the use of:

- HTML
- CSS
- JavaScript
- Developer tools (Git, VS Code, Chrome dev tools)

**Brief**

The project was required to be completed using only HTML, CSS, and vanilla JavaScript. The goal was to build a browser-based game where the user and computer could place their ships on the board and take turns attacking each other's ships. The computer's ship placement and attacks were to be randomised.

**Planning**

UI Wireframe:

![Screenshot 2023-05-09 at 16 50 47](https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/709fcea9-32e4-4be4-b2b1-61a225de5ab8)

The UI was initially conceptualised using Escalidraw. The aim was for the UI to resemble the classic board game while implementing a dialogue box to clearly indicate the current stage of the game. The ‘Play Again’ screen is shown on load and hidden when the user clicks on ’Easy’ or "Hard’. It is shown again once a winner has been decided and the user clicks the ‘Play Again’ button.  

The planning process involved various stages of pseudo code that briefly outlined the overall functionality and which methods and functions to implement to ensure smooth game play and a straightforward build process.

**Build/Code Process**

The code process involved several key steps:

Building the UI using CSS and HTML.

<img width="674" alt="Screenshot 2023-08-09 at 10 57 01" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/47f81cb1-403b-4efc-8b1c-d2d5833b6c6e">

The board elements of the game were to be built using 121 separate HTML Divs for each and styled using CSS Grid. The HTML board elements were to correspond to two, two dimensional JavaScript arrays, one for the player and one for the computer.

Building the ship placement functionality, allowing the user to place their ships on the board.

<img width="508" alt="Screenshot 2023-08-09 at 10 57 54" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/1f323fb7-200b-4e45-a02d-516643289b67">
<img width="435" alt="Screenshot 2023-08-09 at 10 58 23" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/71516f8e-039c-48ad-ac46-e705aa942437">

The ship placement functionality turned out to be more challenging than expected. Initially, I planned for the user to click on the board, updating a two-dimensional JavaScript array accordingly. However, implementing this required more complex logic and recursion than anticipated. The process began with the 'init' function, creating arrays to store the positions and shot attempts for both the player and the computer. The most significant part of the game involved placing the ships for both parties.

To handle the user's ship placement, I created a function called 'handleShipPlacement' that housed individual ship placement functions. The function stored the ship's length and the clicked location on the board in variables named 'shipLength' and 'selection' respectively. It then calculated whether the ship would fit within the board's boundaries by determining the starting and ending rows and columns. A global variable called 'rotation' was used, which toggled between 1 and -1 based on key presses. A value of 1 represented horizontal placement, while -1 represented vertical placement.

To prevent wrapping and check if the ship would fit within the board, I utilised an if/else statement that compared the starting and ending rows or columns. If these conditions were not met, the user was prompted to choose a new location by manipulating the DOM to update the dialogue box's text. The 'shipPlaced' variable remained false, causing the function to repeat until a valid location was selected.

If the conditions were satisfied, a for loop iterated 'shipLength' times to the right or down from the selected tile. The corresponding positions in the 'playerBoard' array were assigned the ship identifier. DOM manipulation was then used to update the HTML element's background colours, indicating the ship's position on the board.

Once all ships were placed by the player, the function containing the logic for computer ship placement was called.

**Randomising the computer's ship placement.**

<img width="489" alt="Screenshot 2023-08-09 at 10 59 06" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/e60303ea-f281-4ac5-9ffe-cf66e3cb0af4">

This portion of the code followed similar logic to the functions allowing the user to place ships, although within this section of code the computer randomly generated a rotation value and a starting position. The function then used while loops to ensure the random starting tile was far enough away from the edge of the board to ensure the ship could fit without wrapping.

Implementing the shot-taking functionality, where the user could click on a tile to take a shot. The corresponding position in the CPU board array was calculated, and hits or misses were registered.

<img width="434" alt="Screenshot 2023-08-09 at 10 59 52" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/a1bfb5fb-4aac-4289-9e2f-c8452c11b1ca">

For the shot taking functionality the user would be prompted to take a shot after all ships had been placed. The user would then click a tile on the computer board and the position in the corresponding cpuBoard array would be calculated by dividing the event target (shotLocation) by 10 for the column and modulus 10 for the row. If the chosen position was equal to 0 then a miss was registered. If the chosen position was not equal to 0 then a computer ship occupied that location and a hit was registered and the value within cpuBoard was set to 0. 

Implementing the computer's shot functionality, where the computer would take a random shot while checking for new locations to avoid repetition.

<img width="416" alt="Screenshot 2023-08-09 at 11 01 01" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/b239cc19-885c-4b8c-ab86-6ef9b1a9c855">

After each user shot the computer shot function was called. The computer shot functionality followed similar logic with the computer picking a random location. The main difference is that after the computer has taken a shot the location is stored within a previousShots array using .push. The computer shot function checks that each shot is a new location by checking if the new shot location is not already contained within the previousShots array via the use of .includes.

Checking for a winner after each shot and updating the DOM accordingly.

<img width="346" alt="Screenshot 2023-08-09 at 11 01 36" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/4c0d36cd-9a36-459d-aee3-ef4e0dffd0db">

The checkForWinner function is called after each shot, the parent function houses nested functions that are called to iterate over both playerBoard and cpuBoard arrays and uses .every to ensure every position within the arrays are not equal to 0. Should one of the arrays contain only 0s then that player has won and the DOM is updated to indicate this. The play again button style is then set to visible so the user can start a new game. 

**Challenges**

Some challenges encountered during the project include:

Ship placing function with rotational options: This was challenging due to the mathematical calculations involved and the repetitive nature of the code. Debugging was required to fix typos and ensure variables were placed correctly.

While loops within the CPU ship placing functions: In some cases, while loops caused infinite loops, leading to crashes. Debugging and reading documentation helped identify issues with loop conditions and order.

**Wins**

I am particularly proud of the logic behind the CPU ship placing functions, which successfully randomised the computer's ship placement and ensured fair gameplay.

<img width="430" alt="Screenshot 2023-08-09 at 11 02 22" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/99cd0613-aac6-4e8b-ae62-9e0ba39f46cc">

I am also proud of the visual design of the user interface, which resembles the classic Battleships game and provides a clear indication of the game's current stage.

<img width="997" alt="Screenshot 2023-08-09 at 11 03 10" src="https://github.com/Fing1499/Battleships-Browser-Game/assets/130996567/a7bae2c5-e963-49c6-a276-05ef688d1c43">

**Key Learnings**

Through this project, I gained hands-on experience with:

DOM manipulation and event handling in JavaScript.
Working with arrays and data structures to store and manipulate game state.
Implementing randomization and logic for CPU gameplay.
Debugging and problem-solving skills.
HTML and CSS for UI design and layout.

**Future Improvements**

Given more time, there are several areas for potential improvement:

Implementing a more advanced AI for the computer player, such as a smarter shot-taking strategy.
Implement ship placement collision prevention.
Adding sound effects or animations to enhance the gaming experience.
Implementing additional game modes and difficulty levels.
Optimising code for better performance and readability.


**Contributors**

Findlay Garrard

