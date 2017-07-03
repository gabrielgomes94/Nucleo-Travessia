<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">

        <title><?php wp_title('|', true, 'right'); ?> <?php bloginfo('name'); ?></title>

        <!-- CSS -->
        <link href="<?php bloginfo('stylesheet_url');?>" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->      

        <?php wp_head(); ?>
    </head>

    <body>
		<div class="jumbotron cabecalho" style="height: 300px; margin-bottom:0; text-align:center; 
			background-image: url('<?php header_image(); ?>');
		">
				<!-- -->
			<!--<h1><//?php bloginfo('name'); ?></h1>
			<p><?php //bloginfo('description'); ?></p>--> 
		</div>
		
		<nav class="navbar navbar-inverse" role="navigation"> 
		<!-- Brand and toggle get grouped for better mobile display --> 
		  <div class="navbar-header"> 
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"> 
			  <span class="sr-only">Toggle navigation</span> 
			  <span class="icon-bar"></span> 
			  <span class="icon-bar"></span> 
			  <span class="icon-bar"></span> 
			</button> 
			<a class="navbar-brand" href="<?php bloginfo('url')?>"><?php bloginfo('name')?></a>
		  </div> 
		  <!-- Collect the nav links, forms, and other content for toggling --> 
		  <div id="navbar" class="collapse navbar-collapse navbar-ex1-collapse"> 
			  			
			<?php /* Primary navigation */
				wp_nav_menu( array(
				  'menu' => 'top_menu',
				  'depth' => 3,
				  'container' => false,
				  'menu_class' => 'nav navbar-nav',
				  //Process nav menu using our custom nav walker
				  'walker' => new wp_bootstrap_navwalker())
				);
			?>
			
			<ul class="nav navbar-nav navbar-right">				
				<li><a href="http://nucleotravessia.unifei.edu.br/wp-login.php"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
			</ul>
		  </div>
		</nav>
						

        <div class="container">
			
