/**
 * Blockloom Frontend Script
 * Handles FAQ accordion and injects FAQ + Person JSON-LD schemas.
 */
( function () {
	'use strict';

	// ─── FAQ Block ───────────────────────────────────────────────────────────

	const ICONS = {
		chevron:
			'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
		plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
		arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>',
	};

	function openItem( item, trigger ) {
		trigger.setAttribute( 'aria-expanded', 'true' );
		item.setAttribute( 'aria-expanded', 'true' );
	}

	function closeItem( item, trigger ) {
		trigger.setAttribute( 'aria-expanded', 'false' );
		item.setAttribute( 'aria-expanded', 'false' );
	}

	function initFaqs() {
		document
			.querySelectorAll( '.blockloom-faqs' )
			.forEach( ( faqBlock ) => {
				const allowMultiple = faqBlock.dataset.allowMultiple === 'true';
				const defaultOpen = faqBlock.dataset.defaultOpen;
				const iconStyle = faqBlock.dataset.iconStyle || 'chevron';
				const enableSchema = faqBlock.dataset.schema === 'true';
				const items = Array.from(
					faqBlock.querySelectorAll( '.blockloom-faq-item' )
				);

				items.forEach( ( item, index ) => {
					const trigger = item.querySelector(
						'.blockloom-faq-item__trigger'
					);

					if ( ! trigger ) {
						return;
					}

					const iconEl = item.querySelector(
						'.blockloom-faq-item__icon'
					);

					// Inject correct icon SVG
					if ( iconEl ) {
						iconEl.innerHTML = ICONS[ iconStyle ] || ICONS.chevron;
					}

					// Set initial state
					if ( defaultOpen === 'first' && index === 0 ) {
						openItem( item, trigger );
					} else {
						closeItem( item, trigger );
					}

					trigger.addEventListener( 'click', () => {
						const isOpen =
							trigger.getAttribute( 'aria-expanded' ) === 'true';

						// Close others if not allowMultiple
						if ( ! allowMultiple ) {
							items.forEach( ( other ) => {
								if ( other !== item ) {
									const otherTrigger = other.querySelector(
										'.blockloom-faq-item__trigger'
									);
									if ( otherTrigger ) {
										closeItem( other, otherTrigger );
									}
								}
							} );
						}

						if ( isOpen ) {
							closeItem( item, trigger );
						} else {
							openItem( item, trigger );
						}
					} );

					// Keyboard: space/enter already handled by button, but support Escape
					trigger.addEventListener( 'keydown', ( e ) => {
						if ( e.key === 'Escape' ) {
							closeItem( item, trigger );
						}
					} );
				} );

				if ( enableSchema ) {
					injectFaqSchema( faqBlock );
				}
			} );
	}

	function injectFaqSchema( faqBlock ) {
		const entities = [];
		faqBlock
			.querySelectorAll( '.blockloom-faq-item' )
			.forEach( ( item ) => {
				const q = item.querySelector( '.blockloom-faq-item__question' );
				const a = item.querySelector(
					'.blockloom-faq-item__answer-content'
				);
				if ( q && a ) {
					entities.push( {
						'@type': 'Question',
						name: q.textContent.trim(),
						acceptedAnswer: {
							'@type': 'Answer',
							text: a.textContent.trim(),
						},
					} );
				}
			} );
		if ( ! entities.length ) {
			return;
		}

		const schema = {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: entities,
		};

		injectSchema( schema );
	}

	// ─── Team Member Block ───────────────────────────────────────────────────

	function injectPersonSchemas() {
		document
			.querySelectorAll(
				'.blockloom-team-member[data-person-schema="true"]'
			)
			.forEach( ( card ) => {
				const name = card
					.querySelector( '.blockloom-team-member__name' )
					?.textContent.trim();

				if ( ! name ) {
					return;
				}

				const role = card
					.querySelector( '.blockloom-team-member__designation' )
					?.textContent.trim();
				const img = card.querySelector( 'img' )?.src;
				const socials = Array.from(
					card.querySelectorAll(
						'.blockloom-team-member__social-link'
					)
				).map( ( a ) => a.href );

				const schema = {
					'@context': 'https://schema.org',
					'@type': 'Person',
					name,
					jobTitle: role || undefined,
					image: img || undefined,
					sameAs: socials.length ? socials : undefined,
				};

				injectSchema( schema );
			} );
	}

	// ─── Rating Block ────────────────────────────────────────────────────────

	function initRatings() {
		// Bar scroll animation
		const bars = document.querySelectorAll(
			'.blockloom-rating__bar-wrap.is-animated'
		);

		if ( bars.length ) {
			if ( 'IntersectionObserver' in window ) {
				const observer = new window.IntersectionObserver(
					( entries ) => {
						entries.forEach( ( entry ) => {
							if ( entry.isIntersecting ) {
								const wrap = entry.target;
								const fill = wrap.querySelector(
									'.blockloom-rating__bar-fill'
								);
								const percent = wrap.dataset.fill || '0';
								if ( fill ) {
									fill.style.width = percent + '%';
								}
								observer.unobserve( wrap );
							}
						} );
					},
					{ threshold: 0.2 }
				);
				bars.forEach( ( bar ) => observer.observe( bar ) );
			} else {
				// Fallback for browsers without IntersectionObserver
				bars.forEach( ( wrap ) => {
					const fill = wrap.querySelector(
						'.blockloom-rating__bar-fill'
					);
					const percent = wrap.dataset.fill || '0';
					if ( fill ) {
						fill.style.width = percent + '%';
					}
				} );
			}
		}

		// AggregateRating schema
		document
			.querySelectorAll( '.blockloom-rating[data-schema="true"]' )
			.forEach( ( block ) => {
				const itemName = block.dataset.itemName;
				const ratingVal = block.dataset.ratingValue;
				const ratingCount = block.dataset.ratingCount;

				if ( ! itemName || ! ratingVal ) {
					return;
				}

				injectSchema( {
					'@context': 'https://schema.org',
					'@type': 'AggregateRating',
					itemReviewed: { '@type': 'Thing', name: itemName },
					ratingValue: ratingVal,
					bestRating: '5',
					worstRating: '1',
					ratingCount: ratingCount || '1',
				} );
			} );
	}

	// ─── Progress Bar Block ────────────────────────────────────────────────────────

	function initProgressBars() {
		const tracks = document.querySelectorAll(
			'.blockloom-progress-bar__track.is-animated'
		);

		if ( ! tracks.length ) {
			return;
		}

		if ( 'IntersectionObserver' in window ) {
			const observer = new window.IntersectionObserver(
				( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							const track = entry.target;
							const fill = track.querySelector(
								'.blockloom-progress-bar__fill'
							);
							const percent = track.dataset.fill || '0';
							if ( fill ) {
								fill.style.width = percent + '%';
							}
							observer.unobserve( track );
						}
					} );
				},
				{ threshold: 0.2 }
			);
			tracks.forEach( ( track ) => observer.observe( track ) );
		} else {
			// Fallback
			tracks.forEach( ( track ) => {
				const fill = track.querySelector(
					'.blockloom-progress-bar__fill'
				);
				const percent = track.dataset.fill || '0';
				if ( fill ) {
					fill.style.width = percent + '%';
				}
			} );
		}
	}

	// ─── Shared Utility ──────────────────────────────────────────────────────

	function injectSchema( data ) {
		const script = document.createElement( 'script' );
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify( data );
		document.head.appendChild( script );
	}

	// ─── Init ────────────────────────────────────────────────────────────────

	function init() {
		initFaqs();
		injectPersonSchemas();
		initRatings();
		initProgressBars();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
