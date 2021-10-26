<?php

namespace App\Controller;

use App\Entity\MicroPost;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\OptionsResolver\Exception\AccessException;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MicroPostType extends AbstractType
{
    /**
     * Except for submit button (?):
     * Fields added must match the entity class given in the form creation process
     * (Controller: formFactory->create) else the code will crash - Example:
     * - Can't get a way to read the property "xxx" in class "App\Entity\MicroPost"
     *
     * Fields that exist in the Entity, but not in the form are ok; they are then simply not evaluated (here).
     * Unsure though what happens if they are required by the Entity before persisting (?).
     *
     * @todo What happens to required, but missing fields?
     * @todo Add 'save' label/message to translation catalogue?
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            //->add('xxx', TextareaType::class, ['label' => false]) // Crash
            ->add('text', TextareaType::class, ['label' => false]) // From Entity: MicroPost
            ->add('save', SubmitType::class, ['label' => 'Save']);
    }

    /**
     * Set data operations against entity, so any form data entered
     * will result in class instances (?).
     *
     * @todo What is this exactly used for? Disabling seems to have no effect.
     * @throws AccessException
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        var_dump(__METHOD__);
        /* * /
        $resolver->setDefaults([
            'data_class' => MicroPost::class,
        ]);
        /* */
    }
}
