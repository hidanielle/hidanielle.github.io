---
layout: feature
title:  "Gowling WLG"
date:   2018-01-26 12:48:54 -0500
categories:
- features
tags: "ITCSS, Vuejs, ES6, accessibility, Kentico"
img: "/assets/thumbs/gowling-t-min.jpg"
---

In an effort to increase site performance and consistency, ecentricarts had the opportunity to rebuild the Gowling WLG website, without a full site redesign. This posed some problems, as the original design of the site did not follow best practices for consistency and accessibility, but my team were able to make reccommendations and compromises where possible. 

The Gowling WLG site is built in the Kentic CMS. The site is almost completely customizeable, and as such, the code is as modular as possible. Following the ITCSS methodology, and utilizing Foundations flexbox grid system, the site design is much more consistent and the code is very resusable. 

Accessibility was one of the top priorities for me during the rebuild. Where necessary, ARIA was used to enhance dynamic features of the site, and accordions, drop downs, mega menus, etc. were all tested with screen readers and keyboards to ensure functionality and content is accessible.

One of the most rewarding parts of the rebuild was the search functionality. On the front end, I used Vue to retrieve search results from the API and display them on the page. With Vue, updating search parameters to pass back to the API to retrieve new results was insanely simple and clean. I built a custom autocomplete vue component that sends text back to the API and displays recommended search results. This autocomplete feature was made accessible by following best practices for comboboxes and ARIA (looking at Google search as an example). Visually hidden text lets users know of the available keyboard controls as well.

[View the live site](http://gowlingwlg.com) 


![Gowling WLG Homepage](/assets/feature/gowling1-min.jpg)
![Gowling WLG mobile screens](/assets/feature/gowlingM-min.jpg)
![Gowling WLG service page](/assets/feature/gowling3-min.jpg)
![Gowling WLG sitewide search page](/assets/feature/gowling4-min.jpg)
