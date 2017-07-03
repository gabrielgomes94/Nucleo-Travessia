<?php
/*	Template Name: Página de Mapa
 * 
 * 
 * */

?>

<?php get_header(); ?>
</div>
<div class="container">
<div class="row">
	<div class="col-md-8">
		<?php 
			if ( is_user_logged_in() ){		
									 ?>																
			
				<?php if (have_posts()): while(have_posts()) : the_post(); ?>
					<h1><?php the_title(); ?></h1>
					<div class="entry-content">
						<?php the_content(); ?>
					</div>			
					<?php endwhile; else: ?>
						<p><?php _e('Desculpe, não há posts a exibir.'); ?></p>
				<?php endif; ?>															
				
			<?php 
			} else { ?>				
					<div  style="text-align:center;">					
						<p>Para acessar essa página, é necessário fazer login. </p>
						<form action="<?php echo get_option('home'); ?>/wp-login.php" method="post">
							Nome de Usuário
							<input type="text" value="" id="log" name="log" class="textfield" size="20" />
							Senha
							<input type="password" value="" id="pwd" name="pwd" class="textfield" size="20" />
				
							<input type="submit" value="Logar" id="submit" class="btn" name="submit" />
							
							<label for="rememberme">
							<input id="rememberme" checked="checked" name="rememberme" type="checkbox" value="forever" />Lembrar-me</label>

						<input name="redirect_to" type="hidden" value="<?php echo $_SERVER['REQUEST_URI']; ?>" />

						</form>
					</div>
					
					
						
					
				
				<?php 
			}
        ?>		
	</div>
	<div class="col-md-4">	
						<!-- Aqui virá a barra lateral -->
						<?php get_sidebar(); ?>
	</div>
</div>
</div>        
<br>  
<div>
<?php get_footer(); ?>
