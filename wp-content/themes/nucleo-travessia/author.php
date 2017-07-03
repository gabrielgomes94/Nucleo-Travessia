<?php get_header(); ?>

<div id="content" class="narrowcolumn">

	<!-- This sets the $curauth variable -->
    <?php
    $user = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author));
    ?>

    
    <?php include("display-author-view.php"); ?>
    <hr>

    <ul>
<!-- The Loop -->
	<div class="row">
	<div class="col-md-8 posts">						
		<h2>Posts de <?php echo $user->display_name; ?></h2>
		<?php if (have_posts()): while(have_posts()) : the_post(); ?>
			<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<p><em><?php echo ucfirst(get_the_time('l, j \d\e F \d\e Y')); ?></em></p>			
			<div class="entry-content noticias-resumo">
				<?php if ( has_post_thumbnail() ) : ?>
					<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
					<img src="<?php the_post_thumbnail_url(); ?>" width="100%"/>
					</a>
				<?php endif; ?>
				
				<?php 
					the_excerpt(); 
				?> 
				
			</div>
			<hr>
			<?php endwhile; include("posts-navigation.php"); else: ?>
				<p><?php _e('Desculpe, não há posts a exibir.'); ?></p>
			<?php endif; ?>
	</div>
	<div class="col-md-4">	
		<!-- Aqui virá a barra lateral -->
		<?php get_sidebar(); ?>
	</div>
</div>   

	
    

<!-- End Loop -->

    </ul>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
