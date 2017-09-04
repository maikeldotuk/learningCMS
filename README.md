This is a CMS to keep track of your own learning. Instead of dividing it in pages like Wordpress it is divided in skills and each skill in sub-skills. 
It is the evolution of the MediaWiki environment that is now kept for comparison in https://www.maikel.uk/old 

The MediaWiki format has a few shortcomings:
* Editing text is cumbersome.  
* Adding pictures is a hindrance.  
* Adding CSS is an incredible annoyance because you do it globally in Commons.CSS
* Adding Javascript is the same because you do it globally in Commons.JS
* To add a new skill I had to manually create a table each and every time or copy-paste one I already did. 

This CMS automatises or solves all of the previous shortcomings of MediaWiki by:
* Using Froala Editor a WYSIWYG solution. 
* Using Angular for Componentisation of both CSS & Javascript. 
* Automatising the creating of skillboxes. 

Be aware that if you fork it and use it in a live website **you'll have to get your own Froala license** for your website. Alternatively you could remove Froala from the PageEditor component and use your own creation or someone else's editor. For conveniency and because it was absolutely necessary to me to put an easy-to-use editor ASAP I went for Froala. Some alternatives are:
 * https://github.com/chymz/ng2-ckeditor
 * https://www.tinymce.com/docs/integrations/angular2/
 
From all those options TinyMCE seems the most viable one. I tried to install it and although it was feasible I found it would have consumed much more time than I required and not quite look as what I wanted. Froala simply checked all the requirements I had in my list. 
 
This is the way the website looks as of 26th of August of 2017. Due to obvious reasons this picture could be outdated. Check the website itself to see the live latest version http://www.maikel.uk

In visitor-mode:

![In visitor-mode](images/visitor.png)

In editor-mode:

![In editor-mode](images/editor.png)

Editing a page:

![Editing a page](images/editPage.png)

