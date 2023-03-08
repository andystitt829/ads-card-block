/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();

	const cardImage = (src, alt) => {
		if(!src) return null;
  
		if(alt) {
		  return (
			<img 
			  className="card__image" 
			  src={ src }
			  alt={ alt }
			/> 
		  );
		}
		
		// No alt set, so let's hide it from screen readers
		return (
		  <img 
			className="card__image" 
			src={ src }
			alt=""
			aria-hidden="true"
		  /> 
		);
	  };
	return (
		<div { ...blockProps }>
			{ cardImage(attributes.imageUrl, attributes.imageAlt) }
			<div className="card-inner">
				<RichText.Content 
					tagName="h2" 
					value={ attributes.title } 
				/>
				<RichText.Content 
					tagName="p" 
					value={ attributes.content } 
				/>
			</div>
		</div>
	);
}
