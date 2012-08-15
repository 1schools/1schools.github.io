<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<title>1schools (1Devs Education Department)</title>
<link type="text/css" rel="stylesheet" href="reset.css" />
<link type="text/css" rel="stylesheet" href="1styles.css" />
<link type="text/css" rel="stylesheet" href="style.css" />
</head>
<body>
<section class="container">
	<h1>دپارتمان آموزشی 1schoos تقدیم میکند</h1>
    <div class="video-container mla mra">
        <video controls="controls">
            <source src="video/movie.webm" type="video/webm" />
            <source src="video/movie.mp4" type="video/mp4" />
        </video>
    </div>
    <!--<h3>please be patient for our new classes.</h3>-->
    <h3>برای آگاه شدن از زمان شروع کلاس ها میتوانید در خبرنامه ما عضو شوید</h3>
   
        <form action="" method="post" class="mla mra">
        <input type="text" name="email" placeholder="ایمیل خود را وارد نمایید" />
        <input type="submit" name="submit" value="ثبت نام" />
        </form>
 
    
	<?php
		if ( isset($_POST['email']) ){
			$email = $_POST['email'];
			if( @mail('register@1schools.com','email: '.$email,"From:info@1schools.com\nReply-To:".$email) ){
				echo '<p class"sendok">we got your mail. you will hear from us soon</p>';
			}else{
				echo '<p class"sendnok">please enter your mail again!</p>';
			}
		}
	?>
    
</section>
</body>
</html>
