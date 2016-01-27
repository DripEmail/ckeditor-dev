/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: entities */

bender.editor = {
	config: {
		extraAllowedContent: 'textarea; p[contenteditable]',
		removePlugins: 'htmlwriter',
		autoParagraph: false,
		basicEntities: false,
		entities_processNumerical: true,
		entities_additional: 'lt,gt,amp,apos,quot',
		entities_latin: false,
		entities_greek: false
	}
};

bender.test( {
	assertBackspace: function( name, key ) {
		var bot = this.editorBot;
		bender.tools.testInputOut( name, function( source, expected ) {
			bot.setHtmlWithSelection( source );
			bender.Y.Event.simulate( bot.editor.editable().$, 'keydown', { keyCode: key } );
			assert.areSame( bender.tools.compatHtml( expected ), bot.getData( true ) );
		} );
	},

	'test XML Entities': function() {
		var xmlEntities = '\'"&lt;&gt;&amp;';

		// XML predefined entities are encoded as character reference.
		assert.areEqual( '&apos;&quot;&lt;&gt;&amp;', this.editor.dataProcessor.toDataFormat( xmlEntities ) );
	},

	'test Other Special Characters': function() {
		var specials = ' ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿×÷ƒ•…′″‾⁄℘ℑℜ™ℵ←↑→↓↔↵⇐⇑⇒⇓⇔∀∂∃∅∇∈∉∋∏∑−∗√∝∞∠∧∨' + // jshint ignore:line
			'∩∪∫∴∼≅≈≠≡≤≥⊂⊃⊄⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋⟨⟩◊♠♣♥♦ˆ˜   ‌‍‎‏–—‘’‚“”„†‡‰‹›€'; // jshint ignore:line
		// Other characters are encoded as numeric entities.
		assert.isFalse( /&\w+?;/.test( this.editor.dataProcessor.toDataFormat( specials ) ) );
	},

	'test quotes encoded in textarea': function() {
		var inputHtml = '<p><textarea>"\'</textarea>"\'</p>',
			expectedHtml = '<p><textarea>&quot;&apos;</textarea>&quot;&apos;</p>',
			editor = this.editor,
			bot = this.editorBot;

		bot.setData( inputHtml, function() {
			assert.areEqual( expectedHtml, editor.getData() );
		} );
	},

	'test HTML encoded in textarea': function() {
		var inputHtml = '<p><textarea> <b style="font-color: red"> aa </b> cc </textarea></p>',
			expectedHtml = '<p><textarea> &lt;b style=&quot;font-color: red&quot;&gt; aa &lt;/b&gt; cc </textarea></p>',
			editor = this.editor,
			bot = this.editorBot;

		bot.setData( inputHtml, function() {
			assert.areEqual( expectedHtml, editor.getData() );
		} );
	},

	'test HTML encoded in element with contenteditable=true': function() {
		var inputHtml = '<p contenteditable="true">"\'</p>',
			expectedHtml = '<p contenteditable="true">&quot;&apos;</p>',
			editor = this.editor,
			bot = this.editorBot;

		bot.setData( inputHtml, function() {
			assert.areEqual( expectedHtml, editor.getData() );
		} );
	},

	'test encoding skipped inside liquid variables': function() {
		var inputHtml = '{{ email | default: "<" | foo: "&" }}',
			expectedHtml = '{{ email | default: "<" | foo: "&" }}',
			editor = this.editor,
			bot = this.editorBot;

		bot.setData( inputHtml, function() {
			assert.areEqual( expectedHtml, editor.getData() );
		} );
	},

	'test encoding multiple liquid variables': function() {
		var inputHtml = '{{ subscriber.name }} foo {{ subscriber.name }}',
			expectedHtml = '{{ subscriber.name }} foo {{ subscriber.name }}',
			editor = this.editor,
			bot = this.editorBot;

		bot.setData( inputHtml, function() {
			assert.areEqual( expectedHtml, editor.getData() );
		} );
	},

	'test encoding skipped inside liquid tags': function() {
		var inputHtml = '{% if email == "<" && email > 4 %} & > < {% endif %}',
			expectedHtml = '{% if email == "<" && email > 4 %} &amp; &gt; &lt; {% endif %}',
			editor = this.editor,
			bot = this.editorBot;

		bot.setData( inputHtml, function() {
			assert.areEqual( expectedHtml, editor.getData() );
		} );
	}
} );
