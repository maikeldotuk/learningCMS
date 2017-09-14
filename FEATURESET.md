# What is this?

This is a list of features that need adding, improving, or that already work in the site. This file is where I kind of control what I'm doing and what I need to get done.

# Features that work
* **Gathering of skills:** I have a better picture of what I know and what I'm learning. I don't need to waste more time thinking what technologies I am aware of. Yet it could be improved as there's many more that are not written there.

* **Writing articles:** The main goal of a platform in which it was easier to write my notes than on MediaWiki but with basically the same goal is accomplished.

* **SEO:** I've got full control of SEO even though I'm using Angular.

# Features that need implementing

* A proper **user login** mechanism. But this depends on the final backend. I'm testing the waters with Flask now. So I could learn two different technologies at once. The problem is that I need to reverse engineer a crawler detector from the Expressjs implementation before I could swap to Flask. Without that crawler detector my SEO solution cannot work. 

* **Autosave** I need to decide if it'll just save whatever I'm writting every 30 seconds and where, if it'll have any sort of version control. This could change the entire way the DB documents are stored.

* **Lazy-loading of pages** When you open this site it loads E-V-E-R-Y-T-H-I-N-G on your browser and I mean everything. That's why there's no wait when clicking any pages. This so far is a feature, not a hindrance, but when there's enough content this could make it radically slow. I need to avoid loading all the pages and instead load just enough info to find them when clicking on them.

# Optional features.

* **Multiuser** I'm not sure this is necesary because the goal is a personal site to keep on top of your own learning. It doesn't make much sense for it to be multiuser.
