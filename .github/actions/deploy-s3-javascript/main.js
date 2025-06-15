const core = require('@actions/core')
// const github = require('@actions/github')
const exec = require('@actions/exec')
function run(params) {
	core.notice('Deploying to AWS S3')
	// get input values
	const bucket = core.getInput('bucket', {
		required: true,
	})
	const bucketRegion = core.getInput('bucket-region', {
		required: true,
	})
	const distFolder = core.getInput('dist-folder', {
		required: true,
	})
	// upload files
	const s3Uri = `s3://${bucket}`
	exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

	// set output value
	core.setOutput(
		'website-url',
		`http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`,
	)
}

run()
