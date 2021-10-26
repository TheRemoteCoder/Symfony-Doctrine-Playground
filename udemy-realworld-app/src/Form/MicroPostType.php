<?php

namespace App\Controller;

use App\Entity\MicroPost;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
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
            ->add('text', TextareaType::class, ['label' => 'Text']) // Entity: MicroPost
            ->add('title', TextType::class, ['label' => 'Title']) // Entity: MicroPost
            ->add('save', SubmitType::class, ['label' => 'Save']);
    }

    /**
     * Udemy course: Set data operations against entity, so any form data entered will result in class instances (?).
     * This seems to be optional - WHY add this?
     *
     * Error if the Entity given here mismatches the form creation Entity:
     * - The form's view data is expected to be a "App\Entity\XXX",
     *   but it is a "App\Entity\MicroPost". You can avoid this error
     *   by setting the "data_class" option to null or by adding a view
     *   transformer that transforms "App\Entity\MicroPost" to an instance of "App\Entity\XXX".
     *
     * @todo What is this exactly used for? Disabling seems to have no effect.
     * @see https://symfony.com/doc/current/form/use_empty_data.html
     * @see https://symfony.com/doc/current/form/without_class.html
     * @throws AccessException
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        //var_dump(__METHOD__);
        /* * /
        $resolver->setDefaults([
            //'data_class' => XXX::class,
            'data_class' => MicroPost::class,
        ]);
        /* */
    }
}
