document.addEventListener("DOMContentLoaded", function() {
    const gameOutput = document.getElementById("game-output");
    const userInput = document.getElementById("user-input");

    const initialText = `Welcome to my humble Home!
 You find yourself in a dark alley, with a door in front of you.
Type 'help' for a list of commands.`;

    const responses = {
        "help": "Available commands:\n- look\n- go right\n- go left\n- quit\n- enter house",
        "go right": "You see a poorly illuminated dead end. On the wall, graffiti can be read 'Beware of Zombies'.",
        "go left": "The alley slowly opens to a large street. You might want to wait before going, as zombies are lurking in the night...",
        "enter house": "You step into the house, and the door closes behind you. Dim lights slowly turn on, giving the room a warm feeling.",
        "look": "In front of you a door stands open, awaiting your visit. It’s impossible to see inside, showing only darkness.",
        "quit": "Thanks for playing! Goodbye."
    };

    gameOutput.textContent = initialText + "\n\n";

    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const input = userInput.value.trim().toLowerCase();
            if (input) {
                gameOutput.textContent += `> ${input}\n`;

                if (responses[input]) {
                    typeMessage(responses[input]);
                    if (input === "quit") {
                        userInput.disabled = true;
                    }
                } else {
                    typeMessage("I don't understand that command.");
                }

                userInput.value = "";
            }
        }
    });

    function typeMessage(message) {
        const speed = 20; // Adjust typing speed (milliseconds per character)
        let index = 0;

        const typeEffect = () => {
            if (index < message.length) {
                gameOutput.textContent += message.charAt(index);
                gameOutput.scrollTop = gameOutput.scrollHeight; // Scroll to bottom
                index++;
                setTimeout(typeEffect, speed);
            } else {
                gameOutput.textContent += "\n"; // Add newline after completion
                gameOutput.scrollTop = gameOutput.scrollHeight; // Scroll to bottom
            }
        };

        typeEffect();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('#hometalk, #game-output, #user-input');
    let delay = 0;

    elements.forEach((element) => {
        const content = element.innerHTML;
        element.innerHTML = '';
        element.style.width = element.offsetWidth + 'px'; // Preserve width
        element.style.height = element.offsetHeight + 'px'; // Preserve height

        let charIndex = 0;

        const typingEffect = () => {
            if (charIndex < content.length) {
                const currentChar = content[charIndex];

                // Check if currentChar is part of an HTML tag
                if (currentChar === '<') {
                    const endIndex = content.indexOf('>', charIndex);
                    element.innerHTML += content.substring(charIndex, endIndex + 1);
                    charIndex = endIndex + 1;
                } else {
                    element.innerHTML += currentChar;
                    charIndex++;
                }

                setTimeout(typingEffect, 50); // Adjust the delay value for typing speed
            } else {
                element.innerHTML = content; // Ensure final content is complete
            }
        };

        setTimeout(typingEffect, delay);
        delay += content.replace(/<[^>]*>/g, '').length * 0; // Adjust the overall delay for each element based on its content length excluding HTML tags
    });
}); 
