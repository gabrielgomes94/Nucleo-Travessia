<div class="container">
				<div class="row author-box">
					<div class="col-lg-8 authorInfo">
						<h2 class="authorName">
							<a href="<?php echo get_author_posts_url( $user->ID ); ?>">
								<?php echo $user->display_name; ?>
							</a>
						</h2>
						<p class="authorDescription"><?php echo get_user_meta($user->ID, 'description', true); ?></p>						
						<p class="authorEmail">							
								<?php								
									if($user->mostrar_email != ''){
										?>
									<b>Email: </b><?php echo $user->user_email; ?> 
									<?php
								} 	
								?>
						</p>
						<p class="authorWebsite">
							<?php 
								$website = $user->user_url;
								if($user->user_url != '')
								{
									printf('<b>Website: </b><a href="%s">%s</a></li>', $user->user_url, $user->user_url);
								}
							?>
						</p>						
						<p class="socialIcons">
							
						<ul>
							<?php																							
								$lattes = get_user_meta($user->ID, 'lattes_profile', true);
								if($lattes != ''){
							?>
								<div class="imgSocialIcons">
								<a href="<?php echo $lattes; ?>" style="text-decoration:none;">
									<img src="<?php bloginfo('template_directory'); ?>/img/icons/lattes.png"/
										style="width: 46px;height:46px;border:0;">											
								</a>
								</div>
							<?php									
								}
								$twitter = get_user_meta($user->ID, 'twitter_profile', true);
								if($twitter != ''){
							?>
								<div class="imgSocialIcons">
								<a href="<?php echo $twitter; ?>" style="text-decoration:none;">
									<img src="<?php bloginfo('template_directory'); ?>/img/icons/twitter.png"/										
										style="width: 48px;height:48px;border:0;">											
								</a>
								</div>
							<?php
								}
								$facebook = get_user_meta($user->ID, 'facebook_profile', true);
								if($facebook != ''){
							?>
								<div class="imgSocialIcons">
								<a href="<?php echo $facebook; ?>" style="text-decoration:none;">
									<img src="<?php bloginfo('template_directory'); ?>/img/icons/facebook.png"/									
										style="width: 48px;height:48px;border:0;">											
								</a>
								</div>
							<?php
								}
								$google = get_user_meta($user->ID, 'google_profile', true);
								if($google != ''){
							?>
								<div class="imgSocialIcons">
								<a href="<?php echo $google; ?>" style="text-decoration:none;">
								<img src="<?php bloginfo('template_directory'); ?>/img/icons/googleplus.png"/											
									style="width: 48px;height:48px;border:0;">											
								</a>
								</div>
							<?php
								}
								$linkedin = get_user_meta($user->ID, 'linkedin_profile', true);
								if($linkedin != ''){
							?>
								<div class="imgSocialIcons">
								<a href="<?php echo $linkedin; ?>" style="text-decoration:none;">
									<img src="<?php bloginfo('template_directory'); ?>/img/icons/linkedin.png"/											
										style="width: 48px;height:48px;border:0;">											
								</a>
								</div>
							<?php
								}
							?>
							</ul>
						</p>
					</div>
					
					<div class="col-lg-4 authorAvatar" >
						
						<?php $url = get_the_author_meta('author_profile_picture', $user->ID); ?>
						<?php if($url=="") $url = "http://nucleotravessia.unifei.edu.br/wp-content/uploads/2016/08/foto-perfil-anonimo.jpg"; ?>
						<img src="<?php echo $url; ?>" width="100%"
							style="border: 2px #111 solid;"
						>
						
						 

									
						</div>
					</div>																	
					
				</div>			
				<br>
