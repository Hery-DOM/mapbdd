<?php


namespace App\Controller;


use App\Entity\Actor;
use App\Form\ActorType;
use App\Repository\ActorRepository;
use App\Repository\CategoryRepository;
use App\Repository\SubCategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     * @Route("/ville/{ville}", name="home_ville")
     */
    public function home($ville="null", CategoryRepository $categoryRepository)
    {
        // get every categories
        $categories = $categoryRepository->findAll();
        $result = $categories;

        // get the city by form
        if(isset($_POST['city-submit'])){

            $ville = str_replace(' ','+',$_POST['city']);

            return $this->redirectToRoute('home_ville',[
                'ville' => $ville
            ]);
        }

        // get the center
        if($ville === 'null'){
            $center = [];
        }else{
            $adress = str_replace(' ','+',$ville);
            $geocoder = "https://api-adresse.data.gouv.fr/search/?q=".$adress;

            $decode = json_decode(file_get_contents($geocoder));

            $local_latitude = $decode->features[0]->geometry->coordinates[1];
            $local_longitude = $decode->features[0]->geometry->coordinates[0];
            $center = [$local_latitude, $local_longitude];
        }




        return $this->render('home.html.twig',[
            'result' => $result,
            'center' => $center
        ]);
    }

    /**
     * @Route("/ajout", name="add")
     */
    public function ajout(Request $request, EntityManagerInterface $entityManager)
    {
        $actor = new Actor();
        $form = $this->createForm(ActorType::class, $actor);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){


            $adress = $request->request->get('actor')['address'];

            $adress = str_replace(' ','+',$adress);
            $geocoder = "https://api-adresse.data.gouv.fr/search/?q=".$adress;

            $decode = json_decode(file_get_contents($geocoder));

            $local_latitude = $decode->features[0]->geometry->coordinates[1];
            $local_longitude = $decode->features[0]->geometry->coordinates[0];

            $actor->setLatitude($local_latitude);
            $actor->setLongitude($local_longitude);

            $entityManager->persist($actor);
            $entityManager->flush();

            return $this->redirectToRoute('add');

        }

        return $this->render('add.html.twig',[
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/ajax", name="ajax")
     */
    public function ajax(CategoryRepository $categoryRepository, ActorRepository $actorRepository,
                         SubCategoryRepository $subCategoryRepository)
    {
        // every categories
        $subCategories = $subCategoryRepository->findAll();
        $actors = [];
        /*foreach($categories as $category){
            foreach($category->getSubCategory() as $subCategories){
                foreach($subCategories->getActor() as $actor){
                    $actors[$actor->getName()] = [$actor->getLatitude(), $actor->getLongitude(),
                        $actor->getDescription()];
                }
            }
        }*/


        // to manage selection with categorgies and subcategories
        if(isset($_POST['ajaxcategory'])){
            $postSubcategory = $_POST['ajaxsubcategory'];
            $actorsDB = [];

            foreach($subCategories as $sub){
                foreach($postSubcategory as $post){
                    if($sub->getId() == $post){
                        foreach($sub->getActor() as $actor){
                            $actorsDB[$actor->getName()] = [$actor->getLatitude(), $actor->getLongitude(),
                                $actor->getDescription()];
                        }
                    }
                }
            }

            /*foreach($category as $cat){
                foreach($cat->getSubCategory() as $sub){
                    $actorsDB[] = $actorRepository->findByCategory($sub);
                }
            }*/
            $actors = [];
            foreach($actorsDB as $key => $actorDB){
                $actors[$key] = [$actorDB[0], $actorDB[1],
                    $actorDB[2]];
            }


        }
        $result = $actors;

        // ajax + return a JSON
        // get the lat and long from center view
        if(isset($_POST['center'])){
            $center = $_POST['center'];
            $latMax = $center[0]+0.1;
            $latMin = $center[0]-0.1;
            $lngMax = $center[1]+0.1;
            $lngMin = $center[1]-0.1;
            $result = [];

            foreach($actors as $key => $actor){
                if($actor[0] < $latMax && $actor[0] > $latMin){
                    if($actor[1] <$lngMax && $actor[1] >$lngMin){
                        $result[$key] = [$actor[0], $actor[1], $actor[2]];
                    }

                }
            }


        }else{
            $result = $actors;
        }






        return new Response(json_encode($result));








    }

}