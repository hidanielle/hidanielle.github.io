---
layout: post
title:  "Customizing Sublime Text 2"
date:   2015-07-19 12:48:54 -0500
categories:
- blog
---

For whatever reason, I still use Sublime Text 2... This is a guide to help explain how you can customize is to look like something your eyes don't hate for ~8 hours a day!

## Installing Package Control
Package Control is how you install add-ons to Sublime. The first add-ons to install will likely be various file types so that Sublime can understand them better.

**Installation instructions [here](https://packagecontrol.io/installation)**

Helpful add-ons include:

* Sass and/or Scss
* LESS
* HAML
* Handlebars
* Various Colour Schemes
* Various Themes
* Emmet ("Zen Coding")

## Installing a Colour Scheme

Colour schemes change the colours in your code files, you can find all kinds of them built in to the Sublime, in Package Control or just out in the wild.

### Package Control

1. Press **"Cmd + Shift + P"**, search for "Install Packages" and select
2. Browse themes by searching "Color Scheme" or a specific scheme name if you know one
3. Set theme in **"Color Scheme > [Your_New Colour_Scheme]"**

### Manual

1. Go to **"Sublime Text 2 > Preferences > Browse Packages"**
2. This should open a Finder window in a "Packages" folder. Drag your downloaded theme folder in here.
3. Go back to Sublime and in the Preference drop down go to **"Color Scheme > [Your_New Colour_Scheme]"**
4. Restart Sublime 

## Installing a Theme

Themes change a bunch of different settings in the **overall** text editor - things like size of tabs, sidebar, etc. 

### Package Control

1. Press **"Cmd + Shift + P"**, search for "Install Packages" and select
2. Browse themes by searching "Theme" (Themes start with "Theme - ")
3. Set theme in **"Preferences > Color Scheme"** OR manually by following instructions 3, 4 and 5 below

### Manual

1. Go to **"Sublime Text 2 > Preferences > Browse Packages"**
2. This should open a Finder window in a "Packages" folder. Drag your downloaded theme folder in here.
3. Go back to Sublime and in the Preference drop down go to **"Settings - User"**
4. Add a line for your theme name `"theme": "[Your_New_Theme].sublime-theme",`
5. Restart Sublime

## Default Settings

**"Sublime Text 2 > Preferences > Settings - Default"**

This file gives pretty good instructions above each line as to what it will do. If you want to change anything here, copy the line into your User Settings file, change it to your desired value, and save it.

## Sample Custom User Settings

* **Color Scheme:** [Dracula](http://zenorocha.github.io/dracula-theme/)
* **Theme:** [Spacegray](http://kkga.github.io/spacegray/)
* **Font:** [Hack](http://sourcefoundry.org/hack/)

![](http://i.imgur.com/oyRlBNC.png)

{% highlight json %}
{
    "color_scheme": "Packages/Dracula Color Scheme/Dracula.tmTheme",

    // If true, the selected text will be copied into the find panel when it's shown.
    "find_selected_text": true,

    "font_face": "Hack",
    "font_size": 15.0,
    "font_options": ["no_italic"],

    // Exiting the application with hot_exit enabled will cause it to close
        // immediately without prompting. Unsaved modifications and open files will
        // be preserved and restored when next starting.
        //
        // Closing a window with an associated project will also close the window
        // without prompting, preserving unsaved changes in the workspace file
        // alongside the project.
    "hot_exit": false,

    // remember_open_files makes the application start up with the last set of
        // open files. Changing this to false will have no effect if hot_exit is
        // true
    "remember_open_files": false,

    // Columns in which to display vertical rulers
    "rulers":
    [
        80
    ],

    // The number of spaces a tab is considered equal to
    "tab_size": 2,

    "theme": "Spacegray.sublime-theme",

    // Set to true to insert spaces when tab is pressed
    "translate_tabs_to_spaces": true,

    // Trims white space added by auto_indent when moving the caret off the
        // line.
    "trim_trailing_white_space_on_save": false
}
{% endhighlight %}

### Custom modification to themes

**Bigger tabs**

1. Open **Spacegray.sublime-theme** (Follow instructions above to get to the Packages folder in Finder)
2. Set `"tab_height": 60` line 18

**Match sidebar background color to window**
I preferred the navy blue used in the Spacegray theme for the sidebar, and I wanted my code window to match the sidebar and general container. 

1. Open **Dracula.tmTheme**
2. Change background color in the XML, line 26

{% highlight html %}
<key>background</key>
<string>#232830</string>
{% endhighlight %}

