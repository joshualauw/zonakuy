<template>
    <NuxtLayout name="default">
        <Header />
        <div class="px-8 py-12 md:px-16">
            <slot></slot>
        </div>
        <Footer />
    </NuxtLayout>
</template>
