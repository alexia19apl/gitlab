import Vue from 'vue';

import dropdownButtonComponent from '~/vue_shared/components/dropdown/dropdown_button.vue';

import mountComponent from 'spec/helpers/vue_mount_component_helper';

const defaultLabel = 'Select';
const customLabel = 'Select project';

const createComponent = config => {
  const Component = Vue.extend(dropdownButtonComponent);

  return mountComponent(Component, config);
};

describe('DropdownButtonComponent', () => {
  let vm;

  beforeEach(() => {
    vm = createComponent();
  });

  afterEach(() => {
    vm.$destroy();
  });

  describe('computed', () => {
    describe('dropdownToggleText', () => {
      it('returns default toggle text', () => {
        expect(vm.toggleText).toBe(defaultLabel);
      });

      it('returns custom toggle text when provided via props', () => {
        const vmEmptyLabels = createComponent({ toggleText: customLabel });

        expect(vmEmptyLabels.toggleText).toBe(customLabel);
        vmEmptyLabels.$destroy();
      });
    });
  });

  describe('template', () => {
    it('renders component container element of type `button`', () => {
      expect(vm.$el.nodeName).toBe('BUTTON');
    });

    it('renders component container element with required data attributes', () => {
      expect(vm.$el.dataset.abilityName).toBe(vm.abilityName);
      expect(vm.$el.dataset.fieldName).toBe(vm.fieldName);
      expect(vm.$el.dataset.issueUpdate).toBe(vm.updatePath);
      expect(vm.$el.dataset.labels).toBe(vm.labelsPath);
      expect(vm.$el.dataset.namespacePath).toBe(vm.namespace);
      expect(vm.$el.dataset.showAny).not.toBeDefined();
    });

    it('renders dropdown toggle text element', () => {
      const dropdownToggleTextEl = vm.$el.querySelector('.dropdown-toggle-text');
      expect(dropdownToggleTextEl).not.toBeNull();
      expect(dropdownToggleTextEl.innerText.trim()).toBe(defaultLabel);
    });

    it('renders dropdown button icon', () => {
      const dropdownIconEl = vm.$el.querySelector('.dropdown-toggle-icon i.fa');

      expect(dropdownIconEl).not.toBeNull();
      expect(dropdownIconEl.classList.contains('fa-chevron-down')).toBe(true);
    });
  });
});
