# Change Log

## 7.0.0-beta.0

### Major Changes

- 541523ab: What: Modal will no longer close when clicking outside by default.
  Why: To align with Astro UXDS compliance requirements 4.3.3: "Dialog Boxes shall be closed only with confirm or cancel Buttons."
  Migration: If you still require this functionality, a new `clickToClose` property has been added. It defaults to `false` so this will be a breaking change.
- 541523ab: What: The following properties and attributes have been removed: `modalMessage`, `modalTitle`, `confirmText`, `denyText`.
  Why: These have been replaced in favor of slots to provide greater flexibility.
  Migration: Use the new `header`, `message`, and `footer` slots instead.

### Minor Changes

- f8093061: Added a icon shadow part to rux-icon.
- f8093061: Adds a container shadow part to rux-global-status-bar
- f8093061: Added a container shadow part to rux-pop-up-menu's ul.
- 541523ab: A new `ruxmodalopened` event has been added.
- f8093061: Added shadow parts to rux-clock
- f8093061: Added a container CSS part to rux-button-group
- f8093061: Adds a 'container' shadow part to rux-button
- f8093061: Added username and app-state shadow parts to rux-global-status-bar
- f8093061: - Monitoring Progress Icon
  - Adds new CSS Shadow Parts for `monitoring-badge`, `monitoring-label`, `monitoring-sublabel`, `container`, `icon-group`, `progress-display`, `radial-progress`, `status-icon`.
  - Monitoring Icon
    - Adds new CSS Shadow Parts for `monitoring-badge`, `monitoring-label`, `monitoring-sublabel`.
- 8cf53857: ** Input ** - Adds `readonly`, `spellcheck`, and `autocomplete` attributes.
- e98f852c: Moved the icon shadow part in rux-icon to be on the SVG element.
  Added exportparts to rux-icon in rux-monitoring-icon.
  Added label and icon shadow parts to rux-push-button.
  Added progress and output shadow shadow parts to rux-progress.
  Added confirm-button and deny-button to the modal's rux-buttons as shadow parts.
  Added label shadow part to rux-segmented-button
  Added switch shadow part to rux-switch. The pseudo selectors ::before select the track, ::after selects the button.
  Added input, form-field shadow parts to rux-input
  Added error-text and help-text parts to FormFieldMessage to allow styling of help/error text.
  Added form-field and label shadow parts to rux-checkbox.
  Added form-field and label shadow parts to rux-radio.
  Added label and select shadow parts to rux-select.
  Added input shadow part to rux-input.
  Added input shadow part to rux-slider
  Added texarea shadow part to rux-textarea
  Added container shadow part to rux-menu-item.
  Added container shadow part to rux-menu-item-divider
  Added exportparts to rux-icon inside of rux-global-status-bar
- f8093061: Added tag and header part to classification banner/tag, added footer part and notice of deprecation of footer-banner

### Patch Changes

- f94be0fc: Fixed an issue with `ruxmodalclosed` event firing twice. Added tests as well.
- 8cf53857: Fixes issue [#121](https://github.com/RocketCommunicationsInc/astro/issues/121) where boolean attributes in React were not behaving as intended.
- Updated dependencies [f94be0fc]
- Updated dependencies [f8093061]
- Updated dependencies [541523ab]
- Updated dependencies [f8093061]
- Updated dependencies [f8093061]
- Updated dependencies [541523ab]
- Updated dependencies [f8093061]
- Updated dependencies [8cf53857]
- Updated dependencies [f8093061]
- Updated dependencies [f8093061]
- Updated dependencies [541523ab]
- Updated dependencies [f8093061]
- Updated dependencies [f8093061]
- Updated dependencies [8cf53857]
- Updated dependencies [e98f852c]
- Updated dependencies [f8093061]
  - @astrouxds/astro-web-components@7.0.0-beta.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.1.0](https://github.com/RocketCommunicationsInc/astro/compare/v6.0.3...v6.1.0) (2021-12-13)

**Note:** Version bump only for package @astrouxds/angular

## [4.4.5](https://github.com/RocketCommunicationsInc/astro/compare/v1.0.0...v4.4.5) (2021-10-20)

### Reverts

- Revert "v1.0.0" ([06dced8](https://github.com/RocketCommunicationsInc/astro/commit/06dced8207a425c9d778cf6bb6fedd6c96aadbb7))
