<?php
/**
Template Name: Search Form
**/
?>
<form action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" accept-charset="utf-8" id="searchform" role="search"
	class="form-inline">  
	<div class="form-group busca">
		<input type="text" class="form-control" name="s" id="s" value="<?php the_search_query(); ?>" size="34px"/>
		<button type="submit" class="btn btn-primary">
			<span class="glyphicon glyphicon-search"></span>  
		</button>
	</div>
</form>
