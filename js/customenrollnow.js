(function ($) {
    $.fn.enrollware = function (options) {
      var settings = {
        feed: 'https://aclsedu.enrollware.com/registration/schedule-feed.ashx',
        courseid: null,
        limit: 10,
        showLocations: true,
        showSeatsRemaining: true
      }
      var courselist=null;
      var opts = $.extend({}, settings, options);
      return this.each(function () {
        var $container = $(this);
        if (opts.feed) {
            var url=opts.feed;
            if(opts.courseid!=null){
                url=opts.feed+"?courseid="+opts.courseid;
            }
        
          console.log(url);
          $.ajax({
            "url": url,
            "dataType": "jsonp",
            "crossDomain": true,
            "cache": false,
            "error": function () {
              $container.empty();
              $container.append("<div>No matching classes were found</div>");
            },
            "success": function (items) {
                    courselist=items;
                    $container.empty();
                    if (items.length == 0) {
                        $container.empty();
                        $container.append("<div>No matching classes were found</div>");
                        return;
                    }
                    $list = $("<div class='courselist'></div>").appendTo($container);
                    var icnt=0;
                    $.each(items, function (i, item) {
                        var $el, $a, contents = '';
                        //clear both div
                        $clearboth= $('<div class="clear"></div>');
                        //singlecoureitem div
                        $li = $("<div class='singlecourse'></div>");
                        //location
                        $location=$("<h4><span>Location: </span></h4>");
                        $location.append(item.location);
                        //time and seat div
                        $otherinfo=$('<div class="clear"></div>');
                        if (item.altTimes !== null && item.altTimes.length > 0) {
                            $otherinfo.append('<div class="time"><span>Date:</span> '+item.altTimes+'</div>');
                        }
                        if (item.altTimes !== null && item.altTimes.length > 0) {
                            $otherinfo.append('<span class="time"><span>Date:</span> '+item.altTimes+'</span>');
                        }
                        else if (item.dateTimes !== null && item.dateTimes.length > 0) {
                            $otherinfo.append( '<span class="time"><span>Date:</span> '+item.dateTimes[0]+'</span>');
                        }
                        if (item.closed) {
                            $otherinfo.append( '<span class="seats"><span>Seats:</span> Closed</span>');
                        }
                        else if (opts.showSeatsRemaining) {
                            $otherinfo.append( '<span class="seats"><span>Seats:</span> '+item.seatsLeft+' left</span>');
                        
                        }
                        else if (item.seatsLeft == 0) {
                            $otherinfo.append( '<span class="seats"><span>Seats:</span> 0 left</span>');
                        }
                        //continue date list
                        $continue=$('<div class="cdate"></div>')
                        if (item.dateTimes !== null && item.dateTimes.length > 1) {
                        $continue.append( '<span>This class continues on:</span><ul class="cdateul">');                      
                        $.each(item.dateTimes.slice(1), function (i, time) {
                            $continue.append( '<li>'+time+'</li>');
                           
                        });
                        $continue.append( '</ul>');
                        }
                        //book now button code.
                        $booknow= $('<div class="booknow"></div>');
                        $a = $("<a>Book Now</a>");
                        $a.addClass("bookbtn");
                        if (item.url) {
                        $a.attr("href", item.url);
                        }
                        if (item.id > 0) {
                        if (item.closed) {
                            $a.attr("title", "Registration is closed for this class");
                            $a.addClass("greylink");
                        } else if (item.seatsLeft > 0) {
                            $a.attr("title", "Click to choose this class");
                        }
                        else {
                            $a.attr("title", "This class is full");
                            $a.addClass("greylink");
                            $a.attr("disabled", "true");
                        }
                        if (item.dateTimes !== null && item.dateTimes.length == 1 && opts.showLocations == false) {
                            $a.addClass("singleline");
                        }
                        }
                        else {
                        $a.attr("title", "Click to register without a schedule");
                        $a.addClass("singleline");
                        $location.append( "I will call to schedule my classroom session");
                        }
                        $li.append($location);
                        $li.append($otherinfo);
                        $li.append($continue);
                        $li.append($clearboth);
                        $booknow.append($a)
                        $li.append($booknow);
                        $list.append($li);
                        icnt++
                        if(icnt >= opts.limit)
                        {
                            return false;
                        }

                    });
            }
          });
        }
      });
    }
  })(jQuery);
  