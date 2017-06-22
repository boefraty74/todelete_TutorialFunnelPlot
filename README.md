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

[chapter1_R\dataset.csv](chapter1_R\dataset.csv)

[chapter1_R\vscript_R_v1_00.r](chapter1_R\script_R_v1_00.r)

The next version of R-script is essentially the same, but implements input errors handling and user parametes to control the appearance of the plot: 

[chapter1_R\vscript_R_v1_01.r](chapter1_R\script_R_v1_01.r)


## Chapter 2

Let us load the "dataset.csv" into Power BI desktop workspace as "Cancer Mortality" table. 
The code in "script_R_v1_01.r" is almost ready to be used within R-visual. 
We only need to comment out the "read.csv" call.

The R-code is: 

[chapter2_Rvisual\script_RV_v2_00.r](chapter2_Rvisual\script_RV_v2_00.r)

See the result in: 

[chapter2_Rvisual\funnelPlot_Rvisual.pbix](chapter2_Rvisual\funnelPlot_Rvisual.pbix)


__Remark:__ The "dataset" is hard-coded name for R-visual and we took care about it already in Chapter 1. 



_to be continued ..._

