# Angular-Responsive
### Purpose

**angular-responsive** is set of AngularJS directives to help with responsive design.

One of the things I keep seeing on the Internets is different strategies for how to build a responsive web site.

There are basically two basic strategies:

1. Use different views for each target device type, this increases the workload on web designers because they have to create a different HTML file for each supported device type.
2. Use a single combined HTML file that uses CSS and media queries to hide those sections that should not be visible on a particular device. This decreases the workload on web designers, but sections that are not displayed still pull images and take up DOM processing time.

![app-mobile-emulation](https://cloud.githubusercontent.com/assets/210413/2806507/081e3202-cccb-11e3-8f62-d1792681014a.png)

> The angular-responsive directives are designed to help solve the issue of unnecessary web requests and excess DOM processing by not inserting the content contained in the directive unless the web page is displayed on the proper device. This keeps network traffic to a minimum and helps to reduce DOM node processing overall.


- - -


### Four (4) Directives:

1. mobile - only displays the contained content on smart phones, this group contains devices that are iOs, Android, Blackberry, Opera Mini, and Windows mobile devices and have a screen width of less than 768 pixels.
2. table - only displays the contained content on tablets, this group contains devices that are iOs, Android, Blackberry, Opera Mini, and Windows mobile devices and have a screen width of greater than 768 pixels.
3. desktop - only displays the contained content on desktops, this group contains any device that does not fall into the above categories.
4. responsive - displays the contained content based on a configuration object that indicates what devices the content should be displayed on. This allows content to be visible on both mobile and table, but not desktop or any type of combination you want.

### How to use angular-responsive

First, you need to include the responsive-directive.js file in your project and then you need to add a dependency to your AngularJS App module.

````js
angular.module('myApp', ['angular-responsive']);
`````

Second, you apply the appropriate directive to a div or span surrounding the content you want to display conditionally.

````js
        <div data-ar-mobile>
            Only shown on mobile devices {{ email }}
            <img ng-src="http://betanews.com/wp-content/uploads/2012/02/businessready.jpg" src="" alt="mobile"
                 width="50" height="50"/>
        </div>
        <div data-ar-tablet>
            Only shown on tablet devices {{ email }}
            <img ng-src="http://www1.pcmag.com/media/images/320913-tablet-satisfaction.jpg" src="" alt="tablets"
                 width="50" height="50"/>
        </div>
        <div data-ar-desktop>
            Only shown on desktop devices {{ email }}
            <img ng-src="http://cdn.arstechnica.net/wp-content/uploads/2012/08/Acer-Aspire-A5560-7414.png" src=""
                 alt="desktop" width="50" height="50"/>
        </div>
        <div data-ar-responsive="{ 'Mobile': true, 'Tablet': true, 'Desktop': false }">
            Only shown on mobile or tablet devices {{ email }}
            <img ng-src="http://mygooseworks.com/home/images/stories/mobiledevices.jpg" src="" alt="tablets and mobile"
                 width="50" height="50"/>
        </div>
````

To display content on more than one type of device you can use the responsive directive and pass in a JSON object, that indicates on which device type the content should be displayed.

```js
 <div data-ar-responsive="{ 'Mobile': true, 'Tablet': true, 'Desktop': false }">
```

<br>

> To delay loading of images until the content is actually displayed, you must use ng-src for image tags. This is due to the fact that browsers will start evaluating HTML before AngularJS gets bootstrapped and the browsers will download the images. Using the ng-src directive delays this until after AngularJS has had a chance to evaluate the HTML.





