<?php global $wp_query; $total_pages = $wp_query->max_num_pages; if ( $total_pages > 1 ) { ?>
    <div id="nav-below" class="navigation">
		<div class="nav-previous"><?php next_posts_link(__( '<span class="meta-nav">«</span> Posts mais antigos', 'seu-template' )) ?></div>
		<div class="nav-next"><?php previous_posts_link(__( 'Posts mais novos <span class="meta-nav">»</span>', 'seu-template' )) ?></div>
    </div><!-- #nav-below -->
<?php } ?>
