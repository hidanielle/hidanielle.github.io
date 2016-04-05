---
layout: post
title:  "Customizing Sublime Text 3"
date:   2016-04-05 12:48:54 -0500
categories:
- blog
---

I finally did it, I made the switch to Sublime Text 3.

For a (very) brief period of time (read: 3 hours), I thought Atom would be my text editor of choice. It's very pretty, by default, and it comes equipped with a shortcut to open through the command line, something you have to manually set up in Sublime. However, those two benefits, seemed to be overshadowed by the unfortunate reality that is the lack of keyboard shortcuts :(.

I'm a super short-cutter. I've become so comfortable with the Sublime Text shortcuts that I just don't think I can move on. Not only that, but after a short search, it seems like there just aren't many shortcuts built into Atom in the first place. Some of my favourites being, to select content between tags, to select content between quotes, etc. And while I'm sure I might be able to get used to the shortcuts built in, and the likelihood of there being some sort of package that adds these shortcuts specifically, it just no longer seemed worth it to me. I didn't think I would use any of the Github integration, and I was a little disappointed that I needed to install a package to "Open in Browser" view a right click in the program...

### With that being said...

On to Sublime Text 3 I went. I'm very happy with my theme set up though, so it was important that I be able to get that configured right away. And while it was mostly easy, I ran into one confusing bit that I thought was important to write down.

First of all, here is a picture of my set up (via my [old post about customizing ST2](http://hidanielle.com/blog/customizing-sublime-text-2/))

![](http://i.imgur.com/oyRlBNC.png)

Here are the steps I took to get here:

* As usual, install the **Package Manager** first. [Installation instructions can be found here](https://packagecontrol.io/installation).
* Open the package manager (`ctrl+shift+p`) and search for **"Install a Package"** (you should see this after just typing in the first couple of letters)
* Search for [Dracula](http://zenorocha.github.io/dracula-theme/) and [Spacegray](http://kkga.github.io/spacegray/) - these are the two colour schemes and themes I'm using - and install them.
* I also like the [Hack](http://sourcefoundry.org/hack/) font for my text editor, so install that on your machine as well.
* Go to **"Preferences/Settings - User"** and paste these lines into your user settings. (If you already have these lines declared in there due to previous edits, just remove them)

{% highlight json %}
{
	"color_scheme": "Packages/Dracula Color Scheme/Dracula.tmTheme",
	"font_face": "Hack",
	"theme": "Spacegray.sublime-theme"
}
{% endhighlight %}

So far, this will get you the font set up as well as the overall look and feel that I'm going for. *However* I like to have my tabs to be much bigger than the default size, and in order to do this, we need to edit the Theme. Previously, installed package files could be found when you browsed your packages folder and could be edited like normal files. This has changed. In order to edit package files now, I've installed, well... another package.

* Open your package control, and install [PackageResourceViewer](https://github.com/skuroda/PackageResourceViewer)
* Once installed, open package control again (`ctrl+shift+p`) and run `PackageResourceViewer: Open Resource` and hit `enter`
* Find the package you're trying to edit (in this case, it's called **Theme - Spacegray**), and then finally select the `Spacegray.sublime-theme` file.
* In the file, find the line for `tab-height` and change this to 60 (or whatever height you want).

### Voila

Now I feel at home again :)
