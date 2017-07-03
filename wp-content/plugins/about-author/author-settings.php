<?php
if(isset($_POST['submit'])) {
	$Author_short_code = sanitize_text_field($_POST['Author_short_code']);
	$switch_off_name = sanitize_text_field($_POST['switch_off_name']);
	$switch_off_web = sanitize_text_field($_POST['switch_off_web']);
	$switch_off_bio_info = sanitize_text_field($_POST['switch_off_bio_info']);
	$switch_off_page = sanitize_text_field($_POST['switch_off_page']);
	$switch_off_post = sanitize_text_field($_POST['switch_off_post']);
	$auther_lbl_text = stripslashes($_POST['auther_lbl_text']);
	$Author_bg_color = sanitize_text_field($_POST['Author_bg_color']);
	$Author_Color = sanitize_text_field($_POST['Author_Color']);
	$auther_lbl_text_font = sanitize_text_field($_POST['auther_lbl_text_font']);
	$Author_PGPP_Font_Style = sanitize_text_field($_POST['Author_PGPP_Font_Style']);

	$ABio_Array[] = array(
		'Author_short_code' => $Author_short_code,
		'switch_off_name' => $switch_off_name,
		'switch_off_web' => $switch_off_web,
		'switch_off_bio_info' => $switch_off_bio_info,
		'switch_off_page' => $switch_off_page,
		'switch_off_post' => $switch_off_post,
		'auther_lbl_text' => $auther_lbl_text,
		'Author_bg_color' => $Author_bg_color,
		'Author_Color' => $Author_Color,
		'auther_lbl_text_font' => $auther_lbl_text_font,
		'Author_PGPP_Font_Style' => $Author_PGPP_Font_Style,
		);
	update_option('author_info_Settings', serialize($ABio_Array));
}

$ABio_settings = unserialize(get_option('author_info_Settings'));
if(count($ABio_settings[0])) {
	$Author_short_code = $ABio_settings[0]['Author_short_code'];
	$switch_off_name = $ABio_settings[0]['switch_off_name'];
	$switch_off_web = $ABio_settings[0]['switch_off_web'];
	$switch_off_bio_info = $ABio_settings[0]['switch_off_bio_info'];
	$switch_off_page = $ABio_settings[0]['switch_off_page'];
	$switch_off_post = $ABio_settings[0]['switch_off_post'];
	$auther_lbl_text = $ABio_settings[0]['auther_lbl_text'];
	$Author_bg_color = $ABio_settings[0]['Author_bg_color'];
	$Author_Color = $ABio_settings[0]['Author_Color'];
	$auther_lbl_text_font = $ABio_settings[0]['auther_lbl_text_font'];
	$Author_PGPP_Font_Style = $ABio_settings[0]['Author_PGPP_Font_Style'];
}
?>
<script>
	jQuery(document).ready(function() {
		jQuery('input.my-color-picker').wpColorPicker();
	});
	function outputUpdate(vol) {
		jQuery("span.volum").text(vol);
	}
</script>
<style>
	.lbl {
		float:left;
		width:100%;
		margin-right:0.7em;
		padding-top:0.3em;
		padding-bottom:0.3em;
		text-align:center;
		font-weight:bold;background-color:#00b9eb;font-size:20px;
		color:white;
	}
</style>
<div class="row-fluid pricing-table pricing-three-column" style="margin-top: 10px; display:block; width:100%; overflow:hidden; background:white; box-shadow: 0 0 5px hsla(0, 0%, 20%, 0.3);padding-bottom:70px">
	<form method="post" action="">
		<div class="plan-name" style="margin-top:20px;text-align: center;">
			<h2 style="font-weight: bold;font-size: 36px;padding-top: 30px;padding-bottom: 10px;color:#D9534F;"><?php _e('Author Settings', 'WL_ABTM_TXT_DM' ); ?></h2>
		</div>
		<table class="form-table" style="margin-left:20px; width: 98%;"  >
			<tr><td colspan="2"><label class="lbl"> <?php _e('Display Author Settings', 'WL_ABTM_TXT_DM' ); ?></label></td></tr>
			<tr>
				<?php if(!isset($switch_off_page)) { $switch_off_page = "yes"; }?>
				<th><?php _e('On page', 'WL_ABTM_TXT_DM' ); ?></th>
				<td><input type="radio" name="switch_off_page" id="switch_off_page" value="yes" <?php checked( 'yes', $switch_off_page ); ?> ><?php _e('Yes', 'WL_ABTM_TXT_DM' ); ?>
					<input type="radio" name="switch_off_page" id="switch_off_page" value="no" <?php checked( 'no', $switch_off_page ); ?>><?php _e('No', 'WL_ABTM_TXT_DM' ); ?></td>
				</tr>
				<?php if(!isset($switch_off_post)) { $switch_off_post = "yes"; }?>
				<th><?php _e('On post', 'WL_ABTM_TXT_DM' ); ?></th>
				<td><input type="radio" name="switch_off_post" id="switch_off_post" value="yes" <?php checked( 'yes', $switch_off_post ); ?> ><?php _e('Yes', 'WL_ABTM_TXT_DM' ); ?>
					<input type="radio" name="switch_off_post" id="switch_off_post" value="no" <?php checked( 'no', $switch_off_post ); ?>><?php _e('No', 'WL_ABTM_TXT_DM' ); ?></td>
				</tr>
				<tr>
					<td colspan="2"><label class="lbl"><?php _e('Select Template Style', 'WL_ABTM_TXT_DM' ); ?></label></td>
				</tr>
				<?php if(!isset($Author_short_code)) { $Author_short_code = "1"; }?>
				<?php	$ABT_CPT_Name = "about_author";
				$ABT_All_Posts = wp_count_posts( $ABT_CPT_Name )->publish;
				global $All_ABTM;
				$All_ABTM = array('post_type' => $ABT_CPT_Name, 'orderby' => 'ASC', 'posts_per_page' => $ABT_All_Posts);
				$All_ABTM = new WP_Query( $All_ABTM );
				?>
				<tr>
					<th><?php _e('Choose one', 'WL_ABTM_TXT_DM' ); ?></th>
					<td><select id="Author_short_code" name="Author_short_code">
						<option value="1">Select Any Shortcode</option>
						<?php
						if( $All_ABTM->have_posts() ) {	 ?>
						<?php
						while ( $All_ABTM->have_posts() ) : $All_ABTM->the_post();
						$PostId = get_the_ID();
						$PostTitle = get_the_title($PostId);
						?>
						<option value="<?php echo $PostId; ?>" <?php if($Author_short_code==$PostId) echo 'selected="selected"'; ?>><?php if($PostTitle) echo $PostTitle; else _e("No Title", WL_ABTM_TXT_DM); ?></option>
					<?php endwhile; ?>
					<?php
				} else  {
					echo "<option>Sorry! No Author Shortcode Created Yet.</option>";
				}
				?>
			</select>
		</td>
	</tr>
	<tr>
		<td colspan="2"><label class="lbl"><?php _e('Display On Post OR Page', 'WL_ABTM_TXT_DM' ); ?></label></td>
	</tr>
	<tr>
		<th><?php _e('Name', 'WL_ABTM_TXT_DM' ); ?></th>
		<?php if(!isset($switch_off_name)) { $switch_off_name = "yes"; }?>
		<td><input type="radio" name="switch_off_name" id="switch_off_name" value="yes" <?php checked( 'yes', $switch_off_name ); ?> ><?php _e('Yes', 'WL_ABTM_TXT_DM' ); ?>
			<input type="radio" name="switch_off_name" id="switch_off_name" value="no" <?php checked( 'no', $switch_off_name ); ?>><?php _e('No', 'WL_ABTM_TXT_DM' ); ?></td>
		</tr>
		<tr>
			<th><?php _e('Website Name', 'WL_ABTM_TXT_DM' ); ?></th>
			<td>
				<?php if(!isset($switch_off_web)) { $switch_off_web = "yes"; }?>
				<input type="radio" name="switch_off_web" id="switch_off_web" value="yes" <?php checked( 'yes', $switch_off_web ); ?> ><?php _e('Yes', 'WL_ABTM_TXT_DM' ); ?>
				<input type="radio" name="switch_off_web" id="switch_off_web" value="no" <?php checked( 'no', $switch_off_web ); ?> > <?php _e('No', 'WL_ABTM_TXT_DM' ); ?>

			</td>
		</tr>
		<tr>
			<th><?php _e('Biographical Info', 'WL_ABTM_TXT_DM' ); ?></th>
			<td>
				<?php if(!isset($switch_off_bio_info)) { $switch_off_bio_info = "yes"; }?>
				<input type="radio" name="switch_off_bio_info" id="switch_off_bio_info" value="yes" <?php checked( 'yes', $switch_off_bio_info ); ?>><?php _e('Yes', 'WL_ABTM_TXT_DM' ); ?>
				<input type="radio" name="switch_off_bio_info" id="switch_off_bio_info" value="no" <?php checked( 'no', $switch_off_bio_info ); ?>><?php _e('No', 'WL_ABTM_TXT_DM' ); ?>
			</td>
		</tr>
		<tr>
			<tr><td colspan="2"><label class="lbl"><?php _e('Author label settings', 'WL_ABTM_TXT_DM' ); ?></label></td></tr>
			<tr>
				<th><?php _e('Author label text', 'WL_ABTM_TXT_DM' ); ?></th>
				<?php if(!isset($auther_lbl_text)) { $auther_lbl_text = "Author Bio"; }?>
				<td>	<input type="text" name="auther_lbl_text" id="auther_lbl_text" value="<?php echo esc_attr($auther_lbl_text); ?>"/></td>
			</tr>

			<tr>
				<th><label><?php _e('Font size', 'WL_ABTM_TXT_DM' ); ?></label></th>
				<td><input  type="range" min="12" max="32" step="1" value="<?php if(!isset($auther_lbl_text_font)) { echo  esc_attr($auther_lbl_text_font = "20"); } else { echo esc_attr($auther_lbl_text_font); } ?>" data-orientation="vertical" id="auther_lbl_text_font"name="auther_lbl_text_font"  oninput="outputUpdate(value);" />
					<span style="width: 25px; height: 30px; margin:auto; display: inline-block; border: 2px solid gray; vertical-align: middle; border-radius: 8px; background-color:#FFFFFF;text-align:center;font-size:20px;margin-left:20px;margin-bottom:20px;" id="auther_lbl_text_font" name="auther_lbl_text_font" class="volum" ><?php echo esc_attr($auther_lbl_text_font); ?><span>
					</td>
				</tr>
				<tr>
					<th><label ><?php _e('Background Color', 'WL_ABTM_TXT_DM' ); ?> </label> </th>
					<td>
						<p><input  type="text" class="my-color-picker" id="Author_bg_color" name="Author_bg_color" value="<?php if(!isset($Author_bg_color)) {	echo esc_attr($Author_bg_color = "#dd3333"); 	} else { echo esc_attr($Author_bg_color); }?>"/>
							<p>
							</td>
						</tr>
						<tr>
							<th><label><?php _e('Font Color', 'WL_ABTM_TXT_DM' ); ?></label></th>
							<td><p><input class="my-color-picker" id="Author_Color" name="Author_Color" type="text"  value="<?php 	if(!isset($Author_Color)) { echo esc_attr($Author_Color = "#ffffff"); } else { echo esc_attr($Author_Color); } ?>"></p></td>
						</tr>
						<tr>
							<th><label><?php _e('Font Family', 'WL_ABTM_TXT_DM' ); ?></label></th>
							<td><?php if(!isset($Author_PGPP_Font_Style)) { $Author_PGPP_Font_Style = "Courier New"; }?>
								<select  name="Author_PGPP_Font_Style" id="Author_PGPP_Font_Style" class="standard-dropdown" >
									<optgroup label="Default Fonts">
										<option value="Arial" <?php selected($Author_PGPP_Font_Style, 'Arial' ); ?> >Arial</option>
										<option value="Arial_black" <?php selected($Author_PGPP_Font_Style, 'Arial_black' ); ?> >Arial Black</option>
										<option value="Courier New" <?php selected($Author_PGPP_Font_Style, 'Courier New' ); ?> >Courier New</option>
										<option value="Georgia" <?php selected($Author_PGPP_Font_Style, 'Georgia' ); ?> >Georgia</option>
										<option value="Grande" <?php selected($Author_PGPP_Font_Style, 'Grande' ); ?> >Grande</option>
										<option value="helvetica_neue" <?php selected($Author_PGPP_Font_Style, 'helvetica_neue' ); ?> >Helvetica Neue</option>
										<option value="impact" <?php selected($Author_PGPP_Font_Style, 'impact' ); ?> >Impact</option>
										<option value="lucida" <?php selected($Author_PGPP_Font_Style, 'lucida' ); ?> >Lucida</option>
										<option value="lucida" <?php selected($Author_PGPP_Font_Style, 'lucida' ); ?> >Lucida Grande</option>
										<option value="OpenSansBold" <?php selected($Author_PGPP_Font_Style, 'OpenSansBold' ); ?> >OpenSansBold</option>
										<option value="palatino" <?php selected($Author_PGPP_Font_Style, 'palatino' ); ?> >Palatino</option>
										<option value="sans" <?php selected($Author_PGPP_Font_Style, 'sans' ); ?> > Sans</option>
										<option value="sans" <?php selected($Author_PGPP_Font_Style, 'Sans-Serif' ); ?> >Sans-Serif</option>
										<option value="tahoma" <?php selected($Author_PGPP_Font_Style, 'tahoma' ); ?> >Tahoma</option>
										<option value="times"<?php selected($Author_PGPP_Font_Style, 'times' ); ?> >Times New Roman</option>
										<option value="trebuchet" <?php selected($Author_PGPP_Font_Style, 'Trebuchet' ); ?> >Trebuchet</option>
										<option value="verdana" <?php selected($Author_PGPP_Font_Style, 'verdana' ); ?> >Verdana</option>
										<option value="cursive" <?php selected($Author_PGPP_Font_Style, 'cursive' ); ?> >cursive</option>
										<option value="monospace" <?php selected($Author_PGPP_Font_Style, 'monospace' ); ?> >monospace</option>
									</optgroup>
								</select>
								<p class="description">
									<?php _e('Choose a caption font style.','WL_ABTM_TXT_DM')?>
								</p>
							</td>
						</tr>
					</tr>
				</tr>
				<tr>
					<td><input type="submit" name="submit"  value="save" id="save" class="button-primary" style="font-size: 18px;width:70%;"></td>
					<td><a href= "<?php $user_ID = get_current_user_id(); echo get_edit_user_link( $user_ID ) ?>"  data-toggle="tooltip" title="Click on link to fill author profile information" class="button-primary" style="font-size: 18px;">Update Social Profile</a>
					</td>
				</tr>
			</table>

		</form>
	</div>
