/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaUpload, RichText } from '@wordpress/block-editor';

import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

    const getImageButton = (openEvent) => {
		if(attributes.imageUrl) {
		  return (
			<img 
			  src={ attributes.imageUrl }
			  onClick={ openEvent }
			  className="image"
			/>
		  );
		}
		else {
		  return (
			<div className="button-container">
			  <Button 
				onClick={ openEvent }
				className="button button-large"
			  >
				Pick an image
			  </Button>
			</div>
		  );
		}
	  };

	const onSelectImage = ( media ) => {
		setAttributes( { imageAlt: media.alt, imageUrl: media.url } )
	}

	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } )
	}

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } )
	}

	return (
		<div { ...blockProps }>
			<MediaUpload
				onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
				type="image"
				value={ attributes.imageID }
				render={ ({ open }) => getImageButton(open) }
			/>
			<div className='card-inner'>
			<RichText 
				tagName="h2"
				onChange={ onChangeTitle }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				value={ attributes.title }
				placeholder={ __( 'Write your title...' ) }
			/>
			<RichText 
				tagName="p"
				onChange={ onChangeContent }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				value={ attributes.content }
				placeholder={ __( 'Write your text...' ) }
			/>
			</div>
		</div>
	);
}
