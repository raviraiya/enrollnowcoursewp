<?php
/**
 * Plugin Name:       Enroll Course WP
 * Plugin URI:        https://provinus.in
 * Description:       Get and show courses of Enrollware
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Sunita Raiya,  Ravi Bhushan Raiya
 * Author URI:        https://provinus.in
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       enroll-course-wp
 * Domain Path:       /languages
 **/
/*
Enroll Course WP is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
Enroll Course WP is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with Enroll Course WP. If not, see https://provinus.in.
*/
if(!class_exists('EnrollNowCourseWP')):
    class EnrollNowCourseWP {

        /** function/method
       * Usage: Get course details from Enroll now API
       * Arg(0): Courseid  - courseid to get classes from enrollnow
       * Arg(1): limit - no of rows you want show on screen
       * Return: html out of course class list
       */
       public static function getCourses($atts= []){
        shortcode_atts(array(
            'courseid' => '-1',
             'limit'=> 10
        ), $atts);
        ob_start();
        $course_id =rand(10,1000);
        ?>
            <h3><?php echo $atts["titile"]; ?></h3>
           <div id="course-<?php echo $course_id; ?>" class="enrollware">
           </div> 
           <script type="text/javascript">
            jQuery(document).ready(function(){
                jQuery('#course-<?php echo $course_id; ?>').enrollware({
                    courseid: "<?php echo  $atts['courseid'];?>",
                    locationid: "<?php echo  $atts['locationid'];?>",
                    limit: <?php echo  $atts['limit'];?>,
                });
            });
           </script>
        <?php
       
         return ob_get_clean();
       }
        /** function/method
       * Usage: enqueue Plguin js files 
       * Arg: none
       * Return: none
       */
       public static function enqueue_enroll_course_js(){
        $course_id =rand(10,1000);
        wp_enqueue_style('ajax_script_css',plugin_dir_url( __FILE__ ) . '/css/customenroll.css?sid='.$course_id);
         wp_enqueue_script( 'enroll_course_js',  plugin_dir_url( __FILE__ ). '/js/customenrollnow.js?sid='.$course_id, array(), false, true  );
        }

   }
   //add shortcode for enroll course
   add_shortcode('enroll-course', array('EnrollNowCourseWP', 'getCourses'));
   //enqueue script and css on wordpress
   add_action('wp_enqueue_scripts', array('EnrollNowCourseWP', 'enqueue_enroll_course_js'));   
endif;

