let lineCount = 1;
const LINES = [];

// Create am empty input line
function createInputLine()
{
    // Creates a div for the input
    const inputDiv = document.createElement("div");
    inputDiv.setAttribute("id", "inputLine");

    const inputForm = document.createElement("form");
    inputForm.setAttribute("onsubmit", "return false");

    const inputText = document.createElement("input");
    inputText.setAttribute("id", "input");
    inputText.setAttribute("autocomplete", "off");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "Type '/' for commands");
    inputText.autofocus = true;

    inputForm.appendChild(inputText);
    inputDiv.appendChild(inputForm);
    document.body.appendChild(inputDiv);
}


function createMiddleInputLine(changedDiv)
{
    // Creates a div for the input
    const inputDiv = document.createElement("div");
    inputDiv.setAttribute("id", "middleInputLine");

    const inputForm = document.createElement("form");
    inputForm.setAttribute("onsubmit", "return false");

    const inputText = document.createElement("input");
    inputText.setAttribute("id", "middleinput");
    inputText.setAttribute("autocomplete", "off");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "Type '/' for commands");
    inputText.autofocus = true;

    inputForm.appendChild(inputText);
    inputDiv.appendChild(inputForm);
    insertAfter(inputDiv, changedDiv);
    inputText.focus();
}

let textid;

function createChangeLine(selectedDiv)
{
    const changeDiv = document.createElement('div');
    changeDiv.setAttribute('id', 'changeLine');

    const inputForm = document.createElement('form');
    inputForm.setAttribute('onsubmit', 'return false');
    const inputText = document.createElement('input');
    inputText.setAttribute('id', 'change');
    inputText.setAttribute('autocomplete', 'off');
    inputText.setAttribute('type', 'text');
    inputText.autofocus = true;

    textid = selectedDiv.id.substring(4);
    inputText.value = LINES[textid]
    inputText.setAttribute("placeholder", LINES[textid]);

    inputForm.appendChild(inputText);
    changeDiv.appendChild(inputForm);

    document.body.insertBefore(changeDiv, selectedDiv);
    // Delete the formatted div
    selectedDiv.parentNode.removeChild(selectedDiv);

    let changeInput = document.getElementById("change");
    changeInput.focus();
    getChangeInput(changeInput, textid);

}


function getInput()
{
    createInputLine();
    let input = document.getElementById('input');
    input.focus();

    input.addEventListener('keydown', function(event)
        {
            // Any keypress will delete command container, if there is one
            if (document.getElementById("buttonContainer"))
            {
                deleteCommandContainer();
            }

            // Create a new DIV
            const currentDiv = document.createElement('div');

            // Check for special keystrokes
            // Checks for Enter to create a new line
            if (event.key === "Enter" || event.key === "|")
            {
                event.preventDefault();

                let divID = "line" + lineCount;
                currentDiv.setAttribute("id", divID);

                // Gives each new div a click functionality
                    // When clicked, get the raw text written to create this line
                    // Be able to change it.
                currentDiv.onclick = function()
                {
                    createChangeLine(currentDiv);
                }

                // Updates number of lines in HTML
                LINES[lineCount] = input.value;

                lineCount++;

                // Appends the formatted input into the created div
                formatted = formatText(input);
                currentDiv.appendChild(formatted)

                // Deletes the inputLine and creates the div
                const inputLine = document.getElementById("inputLine");
                document.body.insertBefore(currentDiv, inputLine);
                inputLine.parentElement.removeChild(inputLine);

                // Create a new input line (recursion)
                getInput();
            }
            // Checks for tab key press and creates text indentation
            else if (event.key == 'Tab')
            {
                event.preventDefault();
                let pretext = input.value;
                pretext += "\t";
                let pre = document.createElement("pre");
                pre.textContent = pretext;
                currentDiv.appendChild(pre);
                input.value = pretext;
            }
            // Checks for '/' and creates command list
            else if (event.key == '/')
            {
                // Deletes already existing command list, if any
                if (document.getElementById("buttonContainer"))
                {
                    deleteCommandContainer();
                }

                // Gets the previous text/value written
                let tempValue = input.value;
                // Checks if the previous value is empty and adds a space if it is
                if (tempValue == "")
                {
                    tempValue += " ";
                }
                else
                {
                    tempValue = " " + tempValue;
                }

                // Calls a function to create the command list container
                createCommandContainer();

                // Focuses on the first button of the command container
                document.querySelector(".commandButton").focus()

                let element;

                // Check which button was pressed and add text formatting accordingly
                buttons = document.querySelectorAll(".commandButton");
                buttons.forEach(button =>{
                    button.addEventListener('click', event => {
                        let val = button.value;
                        if (val == "H1")
                        {
                            element = "#";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("input").focus();
                        }
                        else if (val == "H2")
                        {
                            element = "##";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("input").focus();
                        }
                        else if (val == "H3")
                        {
                            element = "###";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("input").focus();
                        }
                        else if (val == "Paragraph")
                        {
                            element = ""
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("input").focus();
                        }
                        else if (val == "Bullet")
                        {
                            // MAYBE dash???????
                            element = "*";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("input").focus();
                        }
                        else if (val == "Quote")
                        {
                            element = ">";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("input").focus();
                        }
                        else if (val == "Divider")
                        {
                            element = "---";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("input").focus();
                        }
                        deleteCommandContainer();
                    })
                })
            }
        }
    )
}


function getChangeInput(changeInput, textid)
{
    let input = document.getElementById('change');
    input.addEventListener('keydown', function(event)
        {
            // Any keypress will delete command container, if there is one
            if (document.getElementById("buttonContainer"))
            {
                deleteCommandContainer();
            }

            // Create a new DIV
            const changedDiv = document.createElement('div');

            // Check for special keystrokes
            // Checks for Enter to create a new line
            if (event.key === "Enter" || event.key === "|")
            {
                event.preventDefault();

                let divID = "line" + textid;
                changedDiv.setAttribute("id", divID);

                // Gives each new div a click functionality
                    // When clicked, get the raw text written to create this line
                    // Be able to change it.
                changedDiv.onclick = function() {
                    createChangeLine(changedDiv);
                }

                // Updates number of lines in HTML
                LINES[textid] = input.value;

                // Appends the formatted input into the created div
                formatted = formatText(input);
                changedDiv.appendChild(formatted)

                // Deletes the inputLine and creates the div
                const changeLine = document.getElementById("changeLine");
                document.body.insertBefore(changedDiv, changeLine);
                changeLine.parentElement.removeChild(changeLine);

                // Create a new input line (recursion)
                createMiddleInputLine(changedDiv);
                continueChangeInput();
                // getInput();
            }
            // Checks for tab key press and creates text indentation
            else if (event.key == 'Tab')
            {
                event.preventDefault();
                let pretext = input.value;
                pretext += "\t";
                let pre = document.createElement("pre");
                pre.textContent = pretext;
                currentDiv.appendChild(pre);
                input.value = pretext;
            }
            // Checks for '/' and creates command list
            else if (event.key == '/')
            {
                // Deletes already existing command list, if any
                if (document.getElementById("buttonContainer"))
                {
                    deleteCommandContainer();
                }

                // Gets the previous text/value written
                let tempValue = input.value;
                // Checks if the previous value is empty and adds a space if it is
                if (tempValue == "")
                {
                    tempValue += " ";
                }
                else
                {
                    tempValue = " " + tempValue;
                }

                // Calls a function to create the command list container
                createCommandContainer();

                // Focuses on the first button of the command container
                document.querySelector(".commandButton").focus()

                let element;

                // Check which button was pressed and add text formatting accordingly
                buttons = document.querySelectorAll(".commandButton");
                buttons.forEach(button =>{
                    button.addEventListener('click', event => {
                        let val = button.value;
                        if (val == "H1")
                        {
                            element = "#";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "H2")
                        {
                            element = "##";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "H3")
                        {
                            element = "###";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Paragraph")
                        {
                            element = ""
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Bullet")
                        {
                            // MAYBE dash???????
                            element = "*";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Quote")
                        {
                            element = ">";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Divider")
                        {
                            element = "---";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        deleteCommandContainer();
                    })
                })
            }
            else if (event.key == "Backspace" && input.value == "")
            {
                const changeLine = document.getElementById("changeLine");
                changeLine.parentElement.removeChild(changeLine);
            }
        }
    )
}


function continueChangeInput()
{
    input = document.getElementById('middleinput');
    input.addEventListener('keydown', function(event)
        {
            // Any keypress will delete command container, if there is one
            if (document.getElementById("buttonContainer"))
            {
                deleteCommandContainer();
            }

            // Create a new DIV
            const currentDiv = document.createElement('div');

            // Check for special keystrokes
            // Checks for Enter to create a new line
            if (event.key === "Enter" || event.key === "|")
            {
                event.preventDefault();

                let divID = "line" + lineCount;
                currentDiv.setAttribute("id", divID);

                // Gives each new div a click functionality
                    // When clicked, get the raw text written to create this line
                    // Be able to change it.
                currentDiv.onclick = function()
                {
                    createChangeLine(currentDiv);
                }

                // Updates number of lines in HTML
                LINES[lineCount] = input.value;

                lineCount++;

                // Appends the formatted input into the created div
                formatted = formatText(input);
                currentDiv.appendChild(formatted)

                // Deletes the inputLine and creates the div
                const middleInputLine = document.getElementById("middleInputLine");
                document.body.insertBefore(currentDiv, middleInputLine);
                middleInputLine.parentElement.removeChild(middleInputLine);

                createMiddleInputLine(currentDiv);

                // Create a new input line (recursion)
                continueChangeInput();
            }
            // Checks for tab key press and creates text indentation
            else if (event.key == 'Tab')
            {
                event.preventDefault();
                let pretext = input.value;
                pretext += "\t";
                let pre = document.createElement("pre");
                pre.textContent = pretext;
                currentDiv.appendChild(pre);
                input.value = pretext;
            }
            // Checks for '/' and creates command list
            else if (event.key == '/')
            {
                // Deletes already existing command list, if any
                if (document.getElementById("buttonContainer"))
                {
                    deleteCommandContainer();
                }

                // Gets the previous text/value written
                let tempValue = input.value;
                // Checks if the previous value is empty and adds a space if it is
                if (tempValue == "")
                {
                    tempValue += " ";
                }
                else
                {
                    tempValue = " " + tempValue;
                }

                // Calls a function to create the command list container
                createCommandContainer();

                // Focuses on the first button of the command container
                document.querySelector(".commandButton").focus()

                let element;

                // Check which button was pressed and add text formatting accordingly
                buttons = document.querySelectorAll(".commandButton");
                buttons.forEach(button =>{
                    button.addEventListener('click', event => {
                        let val = button.value;
                        console.log(val);
                        if (val == "H1")
                        {
                            element = "#";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "H2")
                        {
                            element = "##";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "H3")
                        {
                            element = "###";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Paragraph")
                        {
                            element = ""
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Bullet")
                        {
                            // MAYBE dash???????
                            element = "*";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Quote")
                        {
                            element = ">";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        else if (val == "Divider")
                        {
                            element = "---";
                            let newValue = element + tempValue;
                            input.value = newValue;
                            document.getElementById("change").focus();
                        }
                        deleteCommandContainer();
                    })
                })
            }
            else if (event.key == "Backspace" && input.value == "")
            {
                const middleInputLine = document.getElementById("middleInputLine");
                middleInputLine.parentElement.removeChild(middleInputLine);
            }
        }
    )
}


function formatText(input)
{
    let value = input.value;
    let text = "";

    // Checks if input starts with tab ???

    // Gets the text format request
    let markdown = value.split(' ')[0];

    // Checks formatting
    // Empty line (no value)
    if (value == "")
    {
        let pre = document.createElement("pre");
        pre.textContent = " ";
        return pre;
    }
    else if (value.startsWith("---"))
    {
        let hr = document.createElement("hr");
        return hr;
    }
    else if (markdown == "###")
    {
        text = value.substring(3).trim();
        // Ignores empty lines
        if (text != "")
        {
            let h3 = document.createElement("h3");
            h3.textContent = text;
            return h3;
        }
        else
        {
            return null
        }
    }
    else if (markdown == "##")
    {
        text = value.substring(2).trim();
        // Ignores empty lines
        if (text != "")
        {
            let h2 = document.createElement("h2");
            h2.textContent = text;
            return h2;
        }
        else
        {
            return null
        }
    }
    else if (markdown == "#")
    {
        text = value.substring(1).trim();
        // Ignores empty lines
        if (text != "")
        {
            let h1 = document.createElement("h1");
            h1.textContent = text;
            return h1;
        }
        else
        {
            return null
        }
    }
    else if (markdown == ">")
    {
        text = value.substring(1).trim();
        // Ignores empty lines
        if (text != "")
        {
            let blockquote = document.createElement("blockquote");
            blockquote.textContent = text;
            return blockquote;
        }
        else
        {
            return null
        }
    }
    else if (markdown == '-' || markdown == '*')
    {
        italicbold = 0;
        let listtext = value.substring(1).trim();
        let li = document.createElement("li");

        if (listtext.includes('*'))
        {
            italicbold++;
            li = boldCheck(listtext, li);
        }

        if (listtext.includes('_'))
        {
            italicbold++;
            li = italicCheck(listtext, li);
        }

        if (italicbold == 0)
        {
            li.textContent = listtext;
        }

        return li;
    }
    else
    {
        italicbold = 0;
        text = value;
        let pre = document.createElement("pre");
        if (text.includes('*'))
        {
            italicbold++;
            pre = boldCheck(text, pre);
        }

        if (text.includes('_'))
        {
            italicbold++;
            pre = italicCheck(text, pre);
        }

        if (italicbold == 0)
        {
            pre.textContent = text;
        }
        return pre;
    }
}


function boldCheck(value, element)
{
    // Sets up initial values
    let starCount = 0;
    let regText = "";
    let boldText = "";

    for (let i = 0; i < value.length; i++)
    {
        // Checks if character is a star
        if (value[i] == '*')
        {
            starCount++;

            // Checks for end of bold
            if (starCount % 2 == 0)
            {
                // Adds the text in bold to the pre element
                let bold = document.createElement("b");
                bold.textContent = boldText;
                element.appendChild(bold);

                // Resets the bold text
                boldText = "";
            }
            // Regular text
            else
            {
                let textnode = document.createTextNode(regText);
                element.appendChild(textnode);

                // Resets the regular text
                regText = "";
            }
        }
        else
        {
            // Adds to regular text
            if (starCount % 2 == 0)
            {
                regText += value[i];
            }
            // Adds to bold text
            else
            {
                boldText += value[i];
            }
        }
    }
    if (starCount % 2 != 0)
    {
        let notbold = document.createTextNode(boldText);
        element.appendChild(notbold);
    }
    else
    {
        let finaltext = document.createTextNode(regText);
        element.appendChild(finaltext);
    }

    return element;
}


function italicCheck(value, pre)
{
    // Sets up initial values
    let italicCount = 0;
    let regText = "";
    let italicText = "";

    for (let i = 0; i < value.length; i++)
    {
        // Checks if character is an underscore
        if (value[i] == '_')
        {
            italicCount++;

            // Checks for end of bold
            if (italicCount % 2 == 0)
            {
                // Adds the text in bold to the pre element
                let italic = document.createElement("em");
                italic.textContent = italicText;
                pre.appendChild(italic);

                // Resets the bold text
                italicText = "";
            }
            // Regular text
            else
            {
                let textnode = document.createTextNode(regText);
                pre.appendChild(textnode);

                // Resets the regular text
                regText = "";
            }
        }
        else
        {
            // Adds to regular text
            if (italicCount % 2 == 0)
            {
                regText += value[i];
            }
            // Adds to italic text
            else
            {
                italicText += value[i];
            }
        }
    }
    if (italicCount % 2 != 0)
    {
        let notitalic = document.createTextNode(italicText);
        pre.appendChild(notitalic);
    }
    else
    {
        let finaltext = document.createTextNode(regText);
        pre.appendChild(finaltext);
    }

    return pre;
}


function createCommandContainer() {
    let containerDIV = document.createElement("div");
    containerDIV.setAttribute("id", "buttonContainer");

    containerDIV.innerHTML += "<div id='buttonId'><img class='buttonImage' src='../static/images/H1.png'><button class='commandButton' type='button' value='H1'>Heading 1</button></div>"
    containerDIV.innerHTML += "<div id='buttonId'><img class='buttonImage' src='../static/images/H2.png'><button class='commandButton' type='button' value='H2'>Heading 2</button></div>"
    containerDIV.innerHTML += "<div id='buttonId'><img class='buttonImage' src='../static/images/H3.png'><button class='commandButton' type='button' value='H3'>Heading 3</button></div>"
    containerDIV.innerHTML += "<div id='buttonId'><img class='buttonImage' src='../static/images/Paragraph.png'><button class='commandButton' type='button' value='Paragraph'>Paragraph</button></div>"
    containerDIV.innerHTML += "<div id='buttonId'><img class='buttonImage' src='../static/images/Bullet.png'><button class='commandButton' type='button' value='Bullet'>Bullet list</button></div>"
    containerDIV.innerHTML += "<div id='buttonId'><img class='buttonImage' src='../static/images/Quote.png'><button class='commandButton' type='button' value='Quote'>Block quote</button></div>"
    containerDIV.innerHTML += "<div id='buttonId'><img class='buttonImage' src='../static/images/divider.png'><button class='commandButton' type='button' value='Divider'>Divider</button></div>"
    document.body.insertBefore(containerDIV, inputLine.nextSibiling);
}


function deleteCommandContainer() {
    let div = document.getElementById("buttonContainer");
    div.parentNode.removeChild(div);
}


function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// Will execute myCallback every 5 seconds
var intervalID = window.setInterval(myCallback, 5000);

function myCallback() {
    currentFocus = document.activeElement;

    middleInputLine = document.getElementById("middleInputLine");
    if (middleInputLine)
    {
        middleFocus = document.getElementById("middleinput");
        if (currentFocus != middleFocus)
        {
            middleInputLine.parentNode.removeChild(middleInputLine);
        }
    }

    changeLine = document.getElementById("changeLine");
    if (changeLine)
    {
        changeFocus = document.getElementById("change");
        if (currentFocus != changeFocus)
        {
            console.log(changeFocus.value);
            const changedDiv = document.createElement('div');
            let divID = "line" + textid;
            changedDiv.setAttribute("id", divID);

            changedDiv.onclick = function() {
                createChangeLine(changedDiv);
            }

            input = changeFocus.value;

            // Updates number of lines in HTML
            LINES[textid] = input;

            // Appends the formatted input into the created div
            let formatted = formatText(changeFocus);
            changedDiv.appendChild(formatted)

            // Deletes the inputLine and creates the div
            const changeLine = document.getElementById("changeLine");
            document.body.insertBefore(changedDiv, changeLine);
            changeLine.parentNode.removeChild(changeLine);
        }
    }
}