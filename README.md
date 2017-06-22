
_still under development ..._

# TutorialFunnelPlot
## Story about the "Funnel Plot"

This [atricle from "thegaurdian"](https://www.theguardian.com/commentisfree/2011/oct/28/bad-science-diy-data-analysis) tells us the inspiring story about how using wrong visualization tools can 
trigger wrong conclusions even by such a serious news publisher as BBC. The real "hero" of this story is "funnel plot". 
Which can be used for comparing institutional performance and medical data analysis.  

![funnel plot image](fp.JPG)

The funnel plot is easy to consume and interpret. The "funnel" is formed by confidence limits and show the amount of expected variation. 
The dots outside the funnel are outliers.

In [this blog ](https://onlinejournalismblog.com/2011/10/31/power-tools-for-aspiring-data-journalists-funnel-plots-in-r/) author demonstrates the implementation of "funnel plot" in R, and we use it as a starting point.  


We are going to use this code in order to incrementally create 
1.	R-script for RStudio
1.	R-visual in Power BI
1.	R-powered Custom Visual in Power BI (PNG-based)
1.	R-powered HTML-based Custom Visual in Power BI

Of cause we could choose not to create R-visual or PNG-based custom visual and to go for HTML-based visual from the beginning, we only do it for the sake of completeness of tutorial.


## Chapter 1

The minimal R-script and the accompanying data table: 

[chapter1_R\dataset.csv](chapter1_R/dataset.csv)

[chapter1_R\vscript_R_v1_00.r](chapter1_R/script_R_v1_00.r)

The next version of R-script is essentially the same, but implements input errors handling and user parametes to control the appearance of the plot: 

[chapter1_R\vscript_R_v1_01.r](chapter1_R/script_R_v1_01.r)

All the code is in [chapter1_R](chapter1_R)


## Chapter 2

Let us load the "dataset.csv" into Power BI desktop workspace as "Cancer Mortality" table. 
The code in "script_R_v1_01.r" is almost ready to be used within R-visual. 
We only need to comment out the "read.csv" call.

The R-code is: 

[chapter2_Rvisual\script_RV_v2_00.r](chapter2_Rvisual/script_RV_v2_00.r)

See the result in: 

[chapter2_Rvisual\funnelPlot_Rvisual.pbix](chapter2_Rvisual/funnelPlot_Rvisual.pbix)


__Remark:__ The "dataset" is hard-coded name for R-visual and we took care about it already in Chapter 1. 


## Chapter 3

We are about to package R code in R-powered Custom Visual. 
Before you can get started you'll need to install the PBIVIZ tools. This should only take a few seconds (or minutes, or hours).
Follow the [instructions here](https://github.com/Microsoft/PowerBI-visuals/blob/master/tools/README.md#installation)

### Section 3.1

Now we will any command line shell (like "Command Prompt") to create new R-powered custom visual:

`> pbiviz new funnelRvisual -t rvisual`

`> cd funnelRvisual`

`> npm install `

`> pbiviz package`


It will create funnelRvisual folder with initial basic visual. 
The PBIVIZ is in "dist" folder. Try to import it in PBIX and see what it does.   

* Open "script.r" file for editing and copy the contents "script_RV_v2_00.r"  just as is !!!
* Open "capabilities.json" in any editor and Find/Replace the "Values" string by "dataset" string. It replaces the name of "Role" in template to be like in R-code. 
* Open "dependencies.json" in any editor and add one section for each R-package required in R-script (if you want to support automatic import of packages, while visual is added first time)

Now re-package the visual again: 
`> pbiviz package`

Try to import it in PBIX again and see what it does.  
The resulting PBIX and the whole Custom Visual Project may be found in: 

[chapter3_RCustomVisual](chapter3_RCustomVisual/)

[chapter3_RCustomVisual\funnelRvisual_v01](chapter3_RCustomVisual/funnelRvisual_v01/)


### Section 3.2

The Custom Visual in previous section is good to go, but it is not really user-friendly. 
Let us divide the input field _"dataset"_ into 3 fields: _"Population"_, _"Number"_ and _"Tooltips"_. 

* Edit "capabilities.json" by replacing _"dataset"_ role by three new roles. You will need to update 2 sections: _dataRoles_ and _dataViewMappings_

These sections define names, types, tooltips and maximum columns  for each input field. 
See more information [here](https://github.com/Microsoft/PowerBI-visuals/blob/master/Capabilities/Capabilities.md)

The resulting  file is 

[chapter3_RCustomVisual\funnelRvisual_v02\capabilities.json](chapter3_RCustomVisual/funnelRvisual_v02/capabilities.json) 

* Edit _"script.r"_ to support _Population_, _Number_ and _Tooltips_ as input dataframes instead of _dataset_

The resulting  file is 
[chapter3_RCustomVisual\funnelRvisual_v02\script.r](chapter3_RCustomVisual/funnelRvisual_v02/script.r )

To follow the changes in R-script, search for the blocks: 

`#RVIZ_IN_PBI_GUIDE:BEGIN:Added to enable custom visual fields `

`...`

`#RVIZ_IN_PBI_GUIDE:END:Added to enable custom visual fields`
 
and 

`#RVIZ_IN_PBI_GUIDE:BEGIN:Removed to enable custom visual fields `

` ...`

`#RVIZ_IN_PBI_GUIDE:END:Removed to enable custom visual fields`

Now re-package the visual again: 

`> pbiviz package`

Try to import it in PBIX again and see what it does.  
The resulting PBIX and the whole Custom Visual Project may be found in:

[chapter3_RCustomVisual](chapter3_RCustomVisual)

[chapter3_RCustomVisual\funnelRvisual_v02](chapter3_RCustomVisual/funnelRvisual_v02)


### Section 3.3

The Custom Visual in previous section is almost perfect, but something is still missing. What is it? 
Of cause, user parameters. 

The user obviously wants to control colors and sizes of visual elements as well as some internal parameters of algorithm from UI. 
Let's add this capability: 

* We need to edit _"capabilities.json"_ again, this time the _objects_ section. More about [_objects_ section ...](https://github.com/Microsoft/PowerBI-visuals/blob/master/Capabilities/Objects.md). 

This is the place to define names, tooltips and types of each parameter. As well we decide on partition of parameters into groups (three groups of parameters inthis case). 


The resulting  file is

[chapter3_RCustomVisual\funnelRvisual_v03\capabilities.json](chapter3_RCustomVisual/funnelRvisual_v03/capabilities.json)

* Now edit _"src\visual.ts"_ file, it is a typeScript. 

You may find this part a little confusing, escpecially if you are not familiar with JavaScript / TypeScript. But, don't worry it is possible just to follow the example. 

You will find four blocks of code added. 
1. Declare new interface to hold the property value; 
1. Define a member property and default values; 
1. Change the  _updateObjects_  method to get the value of the enumeration; 
1. The code in  _enumerateObjectInstances_ to show the property in the property pane

To follow the changes in TypeScript, search for the commented blocks: 

`//RVIZ_IN_PBI_GUIDE:BEGIN:Added to enable user parameters `

` ...`

`//RVIZ_IN_PBI_GUIDE:END:Added to enable user parameters `


The resulting  file is 
[chapter3_RCustomVisual\funnelRvisual_v03\src\visual.ts](chapter3_RCustomVisual/funnelRvisual_v03/src/visual.ts)
 

* Edit _"script.r"_ to support the parameters in UI, it is quite easy just by adding `if.exists` calls per user-parameter

The resulting  file is:

[chapter3_RCustomVisual\funnelRvisual_v03\script.r](chapter3_RCustomVisual/funnelRvisual_v03/script.r)

To follow the changes in R-script, search for the commented code blocks: 

`#RVIZ_IN_PBI_GUIDE:BEGIN:Added to enable user parameters`

` ...`

`#RVIZ_IN_PBI_GUIDE:END:Added to enable user parameters `
 
 
and 


`#RVIZ_IN_PBI_GUIDE:BEGIN:Removed to enable user parameters `

` ...`

`#RVIZ_IN_PBI_GUIDE:END:Removed to enable user parameters `


Note that you may decide not to expose some of the parameters to UI, like we did.  
 

Now re-package the visual again: 

`> pbiviz package`

Try to import it in PBIX again and see what it does.  
The resulting PBIX and the whole Custom Visual Project may be found in:  

[chapter3_RCustomVisual\funnelRvisual_v02](chapter3_RCustomVisual/funnelRvisual_v02)

__Remark:__ In this tutorial we add many parameters of different types (boolean, numeric, string) at once. 
If you find it too complicated to follow, please have a look at [this example](https://github.com/Microsoft/PowerBI-visuals/blob/master/RVisualTutorial/PropertiesPane.md), which shows how to add single parameter. 



## Chapter 4

The resulting visual is PNG-based and therefore not responsive to mouse hover, can not be zoomed in etc., 
In the last step we will show how it can be converted to HTML-based visual. 
We will create an empty R-powered HTML-based Cutom Visual template and then copy scripts from PNG-based custom visual. 

Use any command line shell:

`> pbiviz new funnelRHTMLvisual -t rhtml`

`> cd funnelRHTMLvisual`

`> npm install `

`> pbiviz package`

Explore _"capabilities.json"_ and pay attention to `"scriptOutputType": "html"`  line.

Explore _"dependencies.json"_ and pay attention to names of R-packages listed there.

Explore _"script.r"_ and pay attention to its structure. You may open and run it in RStudio. 
You will find that it creates and saves _"out.html"_ file. This file have to be self-content (without external dependencies) and defines graphics inside HTML widget. 

To help plotly users we also provide R-utilities in _"r_files"_ folder to help with conversion of plotly object into self-content HTML. 
Note that this version of R-powered visual supports `source` command (unlike previous types of visuals) and we use it to make code more readable.   
 
* Replace _"capabilities.json"_ by _"capabilities.json"_ from previous step, but obviously keep:  `"scriptOutputType": "html"`  

The resulting  file is:
[chapter4_RCustomVisual\funnelRHTMLvisual_v01\capabilities.json](chapter4_RCustomVisual/funnelRHTMLvisual_v01/capabilities.json)

* Merge  latest version of the _"sript.r"_ file from Chapter 3 with _"script.r"_ from the template.

The changes are very obvious, we only use plotly packages to convert ggplot object to plotly object. And then use htmlWidgets package to save it to html file. 

We also move most of utility functions to _"r_files/utils.r"_ and add "generateNiceTooltips" function for cosmetics of plotly object

To follow the changes in R-script, search for the blocks: 

`#RVIZ_IN_PBI_GUIDE:BEGIN:Added to create HTML-based ` 

 `...`

`#RVIZ_IN_PBI_GUIDE:BEGIN:Added to create HTML-based` 

and 

`#RVIZ_IN_PBI_GUIDE:BEGIN:Removed to create HTML-based  `

 `...`
 
`#RVIZ_IN_PBI_GUIDE:BEGIN:Removed to create HTML-based `

The resulting  file is 

[chapter4_RCustomVisual\funnelRHTMLvisual_v01\script.r](chapter4_RCustomVisual/funnelRHTMLvisual_v01/script.r)

* Merge  latest version of the dependencies.json file from Chapter 3 with _"dependencies.json"_ from the template, to include new R-package dependencies

The resulting  file is 
[chapter4_RCustomVisual\funnelRHTMLvisual_v01\dependencies.json](chapter4_RCustomVisual/funnelRHTMLvisual_v01/dependencies.json)

* Change the script _"src/visual.ts"_ in exactly the same way as you did in Chapter 3.3 

 To follow the changes in TypeScript, search for the blocks: 

`//RVIZ_IN_PBI_GUIDE:BEGIN:Added to create HTML-based `

` ...`

`//RVIZ_IN_PBI_GUIDE:BEGIN:Added to create HTML-based `


You will find same four blocks of code added (like in Section 3.3)
The resulting  file is 
[chapter4_RCustomVisual\funnelRHTMLvisual_v01\src\visual.ts](chapter4_RCustomVisual\funnelRHTMLvisual_v01/src/visual.ts)

Now re-package the visual again: 

`> pbiviz package`

Try to import it in PBIX again and see what it does.  
The resulting PBIX and the whole Custom Visual Project may be found in:  

[chapter4_RCustomVisual\funnelRHTMLvisual_v01](chapter4_RCustomVisual/funnelRHTMLvisual_v01)

## Last Chapter 

* We recommend developers to edit	_"pbiviz.json"_ to contain correct metadata (such as _version_, _email_, _name_, _license type_  etc.)

__IMPORTANT:__ the "guid" field is an unique identifier for custom visual, so change it if you want several visuals to co-exist. 

* We recommend developers to edit _"assets/icon.png"_ to create cool unique icon for your custom visual.  

And finally we recommend developers to submit their R-powered custom visuals to the store. It will make your visual famous and make you get cool t-shirt. 


# Useful links: 

R-script showcase:

[https://community.powerbi.com/t5/R-Script-Showcase/bd-p/RVisuals](https://community.powerbi.com/t5/R-Script-Showcase/bd-p/RVisuals)

Office Store (gallery): 

[https://store.office.com/en-us/appshome.aspx?ui=en-US&rs=en-US&ad=US&clickedfilter=OfficeProductFilter%3aPowerBI&productgroup=PowerBI](https://store.office.com/en-us/appshome.aspx?ui=en-US&rs=en-US&ad=US&clickedfilter=OfficeProductFilter%3aPowerBI&productgroup=PowerBI)

Tutorial on  Custom Visuals:

[https://github.com/Microsoft/PowerBI-visuals](https://github.com/Microsoft/PowerBI-visuals)

Basic tutorial on R-custom visuals:

[https://github.com/Microsoft/PowerBI-visuals/tree/master/RVisualTutorial](https://github.com/Microsoft/PowerBI-visuals/tree/master/RVisualTutorial)


Develop and submit custom visuals to the store:

[https://powerbi.microsoft.com/en-us/documentation/powerbi-developer-office-store/](https://powerbi.microsoft.com/en-us/documentation/powerbi-developer-office-store/)




_still under development ..._

