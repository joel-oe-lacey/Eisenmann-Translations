# Eisenmann Translations
## Work In Progress
This is an informational site for a German based translation service, currently in progress. The site is a statically generated site built utilizing Gatsby.

## Features
- **Static Pages Generated Via Markdown** - A hallmark advantage of Gatsby, sites can be created from template patterns based on inputted markdown. When paired with a Tina CMS this offers powerful supportability.
- **Dynamic Material UI Menus** - Menu interaction both Nav & Footer are also dynamically generated off the available markdown. The webmaster can define section headers, link names, and also create redirect links and exclusions if a certain page should not be included in the menus. 
- **Built In Responsiveness** - Utilizing Typography.js containers and text dynamically scale to browser dimensions, creating a responsive display with minimal media queries. 
- **Localization** - Pages load with the user locale (Either Deutch or English), users can then select the language they want to view which will update live on the page without reload. Menus & non-markdown content also update in tandem.

## Additions In Progress
- **Localized Slugs** - There is some errant behavior with some of the slug pathing. It would also be more SEO friendly to have
- **Tina CMS Integration** - This will allow live edits of page content in development which saves with Git integration. This will make the creation of new pages much simpler and current pages more supportable.
- **Testing** - Initial testing was delayed while different design patterns were workshopped and as I learned the ins and outs of Gatsby. Now that a stable base has been established as the final spec, unit testing needs to be put in place.
- **Porting over blog** - The original site also has a blog under a separate URL, a blog template is built and needs to be added to the main site, to unify these pages.
- **SEO localization** - SEO provided via React Helmet needs to be localized.
- **UX Improvements** - After some user testing, certain elements, such as the localization selector could stand to be improved. There are also a few styling elements which are jarring. 
- **IE Compatibility** - While Gatsby automatically offers JavaScript polyfills back to IE9, some of the styles currently used need to be polyfilled manually for IE. 

## Challenges 
- **Menu Sections** - Creating menu sections for this site was difficult as there are times when certain markdown pages should not be included, there are times also when you want to redirect to a base page, special handling had to be created to account for this. Pages could not be appropriately nested and structured inside a single GraphQL query, so data massaging had to be put in place.
- **Localization** - Pages are generated via markdown, but off the bat there is not a causal link between differently localized markdown other than their relative file position. I wanted a way to display different localizations of a page without jarring page reloads. This was achieved via restructuring some of the underlying Gatsby infrastructure, the page queries and markdown details to store multiple versions of each page. 