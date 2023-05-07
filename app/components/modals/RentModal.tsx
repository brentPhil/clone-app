"use client"

import React, { useMemo, useState } from "react"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

function RentModal() {
  const rentModal = useRentModal()
  const router = useRouter()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLouding, setIsLouding] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  })

  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")
  const imageSrc = watch("imageSrc")

  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [])

  const setCustomValues = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step != STEPS.PRICE) {
      return onNext()
    }

    setIsLouding(true)

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLouding(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create"
    }

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return "undefined"
    }

    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        center
        title="Which of these best describes your home?"
        subtitle="Choose one"
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 max-h-[45vh] sm:max-h-[65vh] md:max-h-[60vh] lg:max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValues("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="Where is your home located?"
          subtitle="Help guest find you"
        />
        <CountrySelect
          value={location}
          onChange={(country) => setCustomValues("location", country)}
        />
        <Map draggable center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="What information do you want to share?"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests can stay?"
          value={guestCount}
          onChange={(value) => setCustomValues("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValues("roomCount", value)}
        />
        <hr />
        <Counter
          title="Batroom"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValues("bathroomCount", value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="Upload your home images"
          subtitle="Upload your images to help guests find you"
        />
        <ImageUpload
          onChange={(value) => setCustomValues("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="Describe your home"
          subtitle="Tell guests about your home"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLouding}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLouding}
          register={register}
          errors={errors}
          required
        />
        <hr />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="Now, set your price?"
          subtitle="How much do you want to charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLouding}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  )
}

export default RentModal
