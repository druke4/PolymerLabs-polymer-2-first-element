function addFields()
{
    // Number of inputs to create
    var number = document.getElementById("sources").value;
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("sourceContainer");
    // Clear previous contents of the container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<number;i++)
    {
        // Append a node with a random text
        container.appendChild(document.createTextNode("Source " + (i+1) + ": "));
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.type = "text";
        input.name = "member" + i;
        container.appendChild(input);
        // Append a line break
        container.appendChild(document.createElement("br"));
    }
}

function validateFormOnSubmit(theForm)
{
    var reason = "";
    reason += validateSourceMemebers(theForm.name);

    if (reason != "")
    {
        alert("Some fields need correction:\n" + reason);
    }else
    {
        var mySettingsObj = {
          "DataRate":document.getElementsByName('DataRate').value,
          "Range":document.getElementsByName('Range').value,
          "Resolution":document.getElementsByName('Resolution').value,
          "Sources":document.getElementsByName('Sources').value,
        }
        for(i=0;i<document.getElementsByName('Sources').value;i++)
        {
          mySettingsObj.put("Source"+ i, document.getElementsByName("member" + i).value);
        }
        var mySettingsObjString = JSON.stringify(mySettingsObj);
        simpleCart.checkout();
    }
    return false;
}
