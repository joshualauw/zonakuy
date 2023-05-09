<template>
    <ElSkeleton style="width: 100%">
        <template #template>
            <ElSkeletonItem variant="image" style="height: 240px" />
            <div style="padding: 14px">
                <ElSkeletonItem variant="p" style="width: 50%" />
                <div style="display: flex; align-items: center; justify-items: space-between">
                    <ElSkeletonItem variant="text" style="margin-right: 16px" />
                    <ElSkeletonItem variant="text" style="width: 30%" />
                </div>
            </div>
        </template>
    </ElSkeleton>
</template>
